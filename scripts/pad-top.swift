import Foundation
import AppKit

// Usage: swift pad-top.swift <input> <output> <padPixels>
// Extends the image upward by mirroring its top strip, creating headroom.
let args = CommandLine.arguments
guard args.count >= 4, let pad = Int(args[3]) else {
    print("Usage: swift pad-top.swift <input> <output> <padPixels>")
    exit(1)
}

guard let image = NSImage(contentsOfFile: args[1]),
      let rep = NSBitmapImageRep(data: image.tiffRepresentation!) else {
    print("Failed to read \(args[1])")
    exit(1)
}

let w = rep.pixelsWide
let h = rep.pixelsHigh
let newH = h + pad

guard let out = NSBitmapImageRep(
    bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: newH,
    bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
    colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0
) else { exit(1) }

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: out)
let ctx = NSGraphicsContext.current!.cgContext

guard let cg = rep.cgImage else { exit(1) }

// Original image at the bottom of the new canvas
ctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))

// Mirrored top strip fills the padding above
if let strip = cg.cropping(to: CGRect(x: 0, y: 0, width: w, height: pad)) {
    ctx.saveGState()
    ctx.translateBy(x: 0, y: CGFloat(newH))
    ctx.scaleBy(x: 1, y: -1)
    ctx.draw(strip, in: CGRect(x: 0, y: 0, width: w, height: pad))
    ctx.restoreGState()
}

NSGraphicsContext.restoreGraphicsState()

guard let jpeg = out.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else { exit(1) }
try! jpeg.write(to: URL(fileURLWithPath: args[2]))
print("Wrote \(args[2]) (\(w)x\(newH))")

import Foundation
import PDFKit
import AppKit

// Usage: swift pdf-to-images.swift <input.pdf> <output-dir> [scale]
let args = CommandLine.arguments
guard args.count >= 3 else {
    print("Usage: swift pdf-to-images.swift <input.pdf> <output-dir> [scale]")
    exit(1)
}

let inputPath = args[1]
let outputDir = args[2]
let scale: CGFloat = args.count > 3 ? CGFloat(Double(args[3]) ?? 2.0) : 2.0

guard let doc = PDFDocument(url: URL(fileURLWithPath: inputPath)) else {
    print("Failed to open PDF: \(inputPath)")
    exit(1)
}

try? FileManager.default.createDirectory(atPath: outputDir, withIntermediateDirectories: true)

for i in 0..<doc.pageCount {
    guard let page = doc.page(at: i) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let size = CGSize(width: bounds.width * scale, height: bounds.height * scale)

    let image = NSImage(size: size)
    image.lockFocus()
    NSColor.white.setFill()
    NSRect(origin: .zero, size: size).fill()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: ctx)
    image.unlockFocus()

    guard let tiff = image.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let png = rep.representation(using: .png, properties: [:]) else { continue }

    let outPath = "\(outputDir)/page-\(i + 1).png"
    try? png.write(to: URL(fileURLWithPath: outPath))
    print("Wrote \(outPath)")
}
print("Done: \(doc.pageCount) pages")

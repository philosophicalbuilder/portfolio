"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to extract timestamp from YouTube URL (returns seconds)
function getYouTubeTimestamp(url: string): number | null {
  // Check for t= parameter (e.g., &t=114s or &t=114)
  const tMatch = url.match(/[?&]t=(\d+)(?:s)?/i)
  if (tMatch) {
    return parseInt(tMatch[1], 10)
  }
  return null
}

// Helper function to check if URL is a YouTube link
function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url)
}

export default function Home() {
  const projects = [
    {
      id: 1,
      title: "NASA | The MADI Project",
      description:
        "MADI is NASA's in-house LLM developed under the Convergent Aeronautics Solutions Directorate. As a lead designer and product manager, I led a major redesign of the system and its core workflows. This was the highlight of my internship career so far!",
      image: "/projects/madi-project.jpg",
      link: "https://www.youtube.com/watch?v=USoEZLLoiuo",
    },
    {
      id: 2,
      title: "The Frontier Project",
      description:
        "The Frontier Project is founded on the idea that Science is the endless frontier. This is a personal project of mine that serves as a unified platform for researchers to collaborate, share findings, and join labs. There is currently nothing like Frontier - and the University of Virginia is launching pilots to stress test the platform. Exciting!",
      image: "/projects/frontier-project.jpg",
      link: "https://youtu.be/rbuvAWgwN6A",
    },
    {
      id: 3,
      title: '"Circle 2" AI Desktop Assistant',
      description:
        'Circle 2 is a desktop prototype where users can ask about their desktop screen - such as "where can I find heading 2 on Google Docs", or "How do I access my terminal on VS Code?" and a phantom cursor takes over for you.',
      image: "/projects/circle-2-assistant.png",
      link: "https://youtu.be/3ATmEhXXDpg",
    },
    {
      id: 4,
      title: "YAL - Yet Another LLM",
      description:
        '"Yet Another LLM" (YAL) is an LLM assistant that helps buyers across the full lifecycle of an online purchase. "Can you find a yellow dress with roses for less than $50?"',
      image: "/projects/yal-project.png",
      link: "https://www.youtube.com/watch?v=Loir7tDrp7Y&t=114s",
    },
  ]

  return (
    <div className="min-h-screen bg-black p-6 transition-colors duration-500 md:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
          <div className="space-y-6">
            <div className="h-48 w-48 overflow-hidden rounded-full border-2 border-white transition-colors duration-500 md:h-64 md:w-64">
              <Image
                src="/profile.jpg"
                alt="Profile"
                width={256}
                height={256}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white transition-colors duration-500 lg:text-4xl">
                Ramkrishna Sharma
              </h1>
              <p className="text-sm tracking-wide text-white/60 transition-colors duration-500">
                Computer Science student at the University of Virginia, School of Engineering and Applied Sciences.
                (looking for Summer 2026 internships!)
              </p>
              <a
                href="https://www.youtube.com/@TheInnovationLabx/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-white/60"
              >
                My YouTube Channel
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-4">
              <p className="text-base leading-relaxed text-justify text-white/80 transition-colors duration-500">
                By day, I'm a UVA CS student ('27) tackling the messy intersection of code and design. I consider myself
                a translator: I take dense, complex data and turn it into intuitive products that people actually want to
                use. Whether I'm founding platforms like The Frontier Project or prototyping new tools, I'm obsessed
                with making technology empower people rather than confuse them.
              </p>
              <p className="text-base leading-relaxed text-justify text-white/80 transition-colors duration-500">
                By night (or just when I need a break), I step away from the pixels. You can usually find me getting
                my hands dirty with charcoal drawings, losing track of time over a sketchbook, or tutoring students to
                help make their academic lives a little less stressful. But the real main character of my life is
                Chuchu, my 9-year-old golden retriever. He doesn't care about my code or my products, he just wants
                snacks and outside time, and honestly? I respect that perspective.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/60 transition-colors duration-500 mb-4">
                EXPERIENCE
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/logos/nasa-logo.png"
                    alt="NASA"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <p className="text-xs font-bold text-white text-center transition-colors duration-500">NASA</p>
                  <p className="text-xs text-white/70 text-center transition-colors duration-500">Product Designer and PM</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/logos/mit-logo.png"
                    alt="MIT"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <p className="text-xs font-bold text-white text-center transition-colors duration-500">MIT</p>
                  <p className="text-xs text-white/70 text-center transition-colors duration-500">Policy Analyst</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/logos/nsf-logo.png"
                    alt="NSF"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <p className="text-xs font-bold text-white text-center transition-colors duration-500">NSF</p>
                  <p className="text-xs text-white/70 text-center transition-colors duration-500">Data Science Intern</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/logos/gt-logo.png"
                    alt="Georgia Tech"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <p className="text-xs font-bold text-white text-center transition-colors duration-500">Georgia Tech</p>
                  <p className="text-xs text-white/70 text-center transition-colors duration-500">Product Manager</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/logos/georgetown-logo.png"
                    alt="Georgetown University"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <p className="text-xs font-bold text-white text-center transition-colors duration-500">Georgetown</p>
                  <p className="text-xs text-white/70 text-center transition-colors duration-500">Quantum Researcher</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-500 lg:text-3xl">
                PROJECTS
              </h2>
              <p className="mt-2 text-sm text-white/60 transition-colors duration-500">A showcase of my latest work</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => {
                const isYouTube = isYouTubeUrl(project.link)
                const videoId = isYouTube ? getYouTubeVideoId(project.link) : null
                // Get timestamp from URL, or default to 60 seconds (middle-ish for most videos)
                const startTime = isYouTube ? (getYouTubeTimestamp(project.link) ?? 60) : 0
                // YAL project (id 4) should show static image, not autoplay video
                const shouldShowVideo = isYouTube && videoId && project.id !== 4

                return (
                  <a
                    key={project.id}
                    href={project.link}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    className="group overflow-hidden rounded-lg border-2 border-white/20 bg-white/5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden bg-black relative">
                      {shouldShowVideo ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&start=${startTime}`}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title={project.title}
                        />
                      ) : (
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-contain transition-all duration-300"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold uppercase tracking-tight text-white transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/60 transition-colors duration-500">{project.description}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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

type Project = {
  id: number
  title: string
  description: string
  image: string
  link: string
}

type Tutorial = {
  id: number
  title: string
  description: string
  link?: string
  status?: "live" | "coming-soon"
}

type Video = {
  id: number
  title: string
  link: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"projects" | "tutorials" | "videos">("projects")
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)

  const projects: Project[] = [
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

  const tutorials: Tutorial[] = [
    {
      id: 5,
      title: "Python",
      description:
        "A comprehensive Python tutorial covering fundamentals — printing, data types, user input, typecasting, strings, boolean operators, and conditional branches.",
      link: "https://sapphire-eoraptor-096.notion.site/ebd/8b5fbff75cc646f0b2f418a859bc15a0",
      status: "live",
    },
    {
      id: 1,
      title: "React Fundamentals",
      description:
        "A hands-on React notebook that walks through components, JSX, props, state, and hooks — with examples you can tweak as you learn.",
      link: "https://sapphire-eoraptor-096.notion.site/ebd/1a2a644271ca47be9d2e1cedaeccdd05",
      status: "live",
    },
    {
      id: 2,
      title: "Web Development by Ramkrishna Sharma",
      description:
        "A beginner-friendly guide to the web — what HTML, CSS, and JavaScript do, how MDN docs work, and how to wire a full page together.",
      link: "https://sapphire-eoraptor-096.notion.site/ebd/fdce77dede034d54adeaa9f9b4ece946",
      status: "live",
    },
    {
      id: 3,
      title: "Node.js and Express Tutorial",
      description:
        "Step‑by‑step notes on building backend APIs with Node.js and Express — routing, middleware, and sending JSON from your own server.",
      link: "https://sapphire-eoraptor-096.notion.site/ebd/3d741450920348e0984b81769cf5a108",
      status: "live",
    },
    {
      id: 4,
      title: "Data Structures and Algorithms",
      description:
        "A comprehensive guide to fundamental data structures and algorithms — arrays, linked lists, trees, graphs, sorting, and searching with practical examples.",
      link: "https://sapphire-eoraptor-096.notion.site/ebd/7d8add07673c479698d906b46137f471",
      status: "live",
    },
  ]

  const videos: Video[] = [
    {
      id: 1,
      title: "Video 1",
      link: "https://www.youtube.com/watch?v=j4QLEQyCwwI&t=308s",
    },
    {
      id: 2,
      title: "Video 2",
      link: "https://www.youtube.com/watch?v=pbjniFi3O04&t=1321s",
    },
    {
      id: 3,
      title: "Video 3",
      link: "https://www.youtube.com/watch?v=uTdU450oHS4&t=884s",
    },
    {
      id: 4,
      title: "Video 4",
      link: "https://www.youtube.com/watch?v=JR7jSYWzrmc&t=5317s",
    },
    {
      id: 5,
      title: "Video 5",
      link: "https://www.youtube.com/watch?v=jv02kCUqr7o&t=810s",
    },
    {
      id: 6,
      title: "Video 6",
      link: "https://www.youtube.com/watch?v=Rnt2O64WnbE&t=455s",
    },
    {
      id: 7,
      title: "Video 7",
      link: "https://www.youtube.com/watch?v=x_AwYOHLtyU&t=806s",
    },
    {
      id: 8,
      title: "Video 8",
      link: "https://www.youtube.com/watch?v=hTjTfqzjeGY&t=137s",
    },
    {
      id: 9,
      title: "Video 9",
      link: "https://www.youtube.com/watch?v=7H-Xki7-h_0&t=885s",
    },
    {
      id: 10,
      title: "Video 10",
      link: "https://www.youtube.com/watch?v=aGwJTTq471I",
    },
    {
      id: 11,
      title: "Video 11",
      link: "https://www.youtube.com/watch?v=AqWTtpKlV_g&t=389s",
    },
    {
      id: 12,
      title: "Video 12",
      link: "https://www.youtube.com/watch?v=2EUS24ViJ40&t=887s",
    },
    {
      id: 13,
      title: "Video 13",
      link: "https://www.youtube.com/watch?v=VsSuoUhOHPY&t=665s",
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

            <p className="text-base leading-relaxed text-justify text-white/80 transition-colors duration-500">
              I'm a UVA CS student ('27) bridging the gap between code and design. Whether founding platforms like The
              Frontier Project or prototyping new tools, I translate dense data into intuitive products that empower
              users. Off-screen, I love doing charcoal sketches, tutoring students, and serving as the dedicated support
              staff for Chuchu, my 9-year-old golden retriever.
            </p>
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

            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-500 lg:text-3xl">
                    WORK
                  </h2>
                  <p className="mt-2 text-sm text-white/60 transition-colors duration-500">
                    Toggle between shipped projects, written deep-dives, and videos.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-medium uppercase tracking-wide text-white/60">
                  <button
                    type="button"
                    onClick={() => setActiveTab("projects")}
                    className={`rounded-full px-3 py-1 transition-all duration-200 ${
                      activeTab === "projects"
                        ? "bg-white text-black shadow-sm"
                        : "text-white/60 hover:bg-white/10"
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("videos")}
                    className={`rounded-full px-3 py-1 transition-all duration-200 ${
                      activeTab === "videos"
                        ? "bg-white text-black shadow-sm"
                        : "text-white/60 hover:bg-white/10"
                    }`}
                  >
                    Videos
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("tutorials")}
                    className={`rounded-full px-3 py-1 transition-all duration-200 ${
                      activeTab === "tutorials"
                        ? "bg-white text-black shadow-sm"
                        : "text-white/60 hover:bg-white/10"
                    }`}
                  >
                    Written Tutorials
                  </button>
                </div>
              </div>

              {activeTab === "videos" ? (
                <div className="grid gap-6 pt-2 sm:grid-cols-2">
                  {videos.map((video) => {
                    const videoId = getYouTubeVideoId(video.link)

                    return (
                      <a
                        key={video.id}
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer overflow-hidden rounded-lg border-2 border-white/20 bg-white/5 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="relative aspect-video overflow-hidden bg-black">
                          {videoId && (
                            <>
                              <Image
                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                alt={video.title}
                                width={640}
                                height={360}
                                className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-75"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/10">
                                <div className="rounded-full bg-white/90 p-4 transition-transform duration-300 group-hover:scale-110">
                                  <svg
                                    className="h-8 w-8 text-black"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold uppercase tracking-tight text-white transition-colors duration-500">
                            {video.title}
                          </h3>
                        </div>
                      </a>
                    )
                  })}
                </div>
              ) : activeTab === "projects" ? (
                <div className="grid gap-6 pt-2 sm:grid-cols-2">
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
                        className="group cursor-pointer overflow-hidden rounded-lg border-2 border-white/20 bg-white/5 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="relative aspect-video overflow-hidden bg-black">
                          {shouldShowVideo ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&start=${startTime}`}
                              className="absolute inset-0 h-full w-full"
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
                          <p className="mt-1 text-sm text-white/60 transition-colors duration-500">
                            {project.description}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              ) : (
                <>
                  <div className="space-y-4 pt-2">
                    {tutorials.map((tutorial) => {
                      const isLive = !!tutorial.link && tutorial.status !== "coming-soon"

                      return (
                        <button
                          key={tutorial.id}
                          onClick={() => isLive && setSelectedTutorial(tutorial)}
                          disabled={!isLive}
                          className={`block w-full rounded-xl border-2 border-white/15 bg-white/5 p-5 text-left transition-all duration-300 ${
                            isLive
                              ? "cursor-pointer hover:border-white/40 hover:bg-white/10"
                              : "cursor-default opacity-90"
                          }`}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-2">
                              <h3 className="text-base font-semibold uppercase tracking-tight text-white sm:text-lg">
                                {tutorial.title}
                              </h3>
                              <p className="text-sm text-white/70">{tutorial.description}</p>
                            </div>

                            <p className="mt-1 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-white/60 sm:mt-0">
                              {isLive ? "Open Tutorial" : "Coming Soon"}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <Dialog open={!!selectedTutorial} onOpenChange={(open) => !open && setSelectedTutorial(null)}>
                    <DialogContent 
                      showCloseButton={false}
                      className="!max-w-5xl w-[90vw] !max-h-[85vh] h-[85vh] p-0 bg-black border-white/20 sm:!max-w-5xl"
                    >
                      <button
                        onClick={() => setSelectedTutorial(null)}
                        className="absolute top-20 right-6 z-50 rounded-xs bg-black/80 hover:bg-black/90 text-white opacity-70 hover:opacity-100 p-2 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Close"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      {selectedTutorial?.link && (
                        <iframe
                          src={selectedTutorial.link}
                          width="100%"
                          height="100%"
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                          style={{ border: "none" }}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

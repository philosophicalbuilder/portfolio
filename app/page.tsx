"use client"

import Image from "next/image"
import { ExternalLink, Play, Square } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
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

type Publication = {
  id: number
  title: string
  authors: string
  venue: string
  description: string
  pagesPath: string
  pageCount: number
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"projects" | "tutorials" | "publications">("projects")
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [isSongPlaying, setIsSongPlaying] = useState(false)

  // Swipeable section pager — slides sync with the tab pills
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" })
  const sectionOrder: ("projects" | "publications" | "tutorials")[] = ["projects", "publications", "tutorials"]

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      const sections = ["projects", "publications", "tutorials"] as const
      setActiveTab(sections[emblaApi.selectedScrollSnap()])
    }
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const goToSection = useCallback(
    (tab: "projects" | "publications" | "tutorials") => {
      setActiveTab(tab)
      emblaApi?.scrollTo(sectionOrder.indexOf(tab))
    },
    [emblaApi],
  )

  // Plays the song through the YouTube IFrame API so we can lower the volume
  useEffect(() => {
    if (!isSongPlaying) return

    let player: any
    let cancelled = false

    const createPlayer = () => {
      if (cancelled) return
      player = new (window as any).YT.Player("song-player", {
        videoId: "vTHtvnUBKAw",
        playerVars: { autoplay: 1, start: 251 },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(25)
            e.target.playVideo()
          },
        },
      })
    }

    const w = window as any
    if (w.YT?.Player) {
      createPlayer()
    } else {
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
      if (!existing) {
        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        document.head.appendChild(tag)
      }
      const prev = w.onYouTubeIframeAPIReady
      w.onYouTubeIframeAPIReady = () => {
        prev?.()
        createPlayer()
      }
    }

    return () => {
      cancelled = true
      player?.destroy?.()
    }
  }, [isSongPlaying])

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
      link: "https://www.youtube.com/watch?v=gWKjHJtEhdk&t=54s",
    },
    {
      id: 3,
      title: "MADI: Team Matching",
      description:
        "A demo of MADI's team matching workflow — connecting NASA researchers and innovators with the right teams and expertise across the agency, designed and shipped as part of my work on MADI.",
      image: "/projects/madi-project.jpg",
      link: "https://www.youtube.com/watch?v=8TaQt-Oj5WY",
    },
    {
      id: 4,
      title: "YAL - Yet Another LLM",
      description:
        '"Yet Another LLM" (YAL) is an LLM assistant that helps buyers across the full lifecycle of an online purchase. "Can you find a yellow dress with roses for less than $50?"',
      image: "/projects/yal-project.png",
      link: "https://www.youtube.com/watch?v=hR6qRgXKZIw&t=569s",
    },
    {
      id: 5,
      title: "Activity Select",
      description:
        "A walkthrough of the Activity Selection problem — a classic greedy algorithm for scheduling the maximum number of non-overlapping activities.",
      image: "/placeholder.svg",
      link: "https://www.youtube.com/watch?v=YiETlgZUeUA",
    },
    {
      id: 6,
      title: "Kruskal's algorithm",
      description:
        "An explanation of Kruskal's algorithm for finding a minimum spanning tree in a weighted graph using a greedy edge-selection approach.",
      image: "/placeholder.svg",
      link: "https://www.youtube.com/watch?v=whB7UjMMSD4&t=686s",
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

  const publications: Publication[] = [
    {
      id: 1,
      title: "Schrödinger factorization chain for a system displaying broken supersymmetry",
      authors: "Bennett Lamb, Ramkrishna Sharma, Luogen Xu, and James K. Freericks",
      venue: "University of Virginia & Georgetown University",
      description:
        "Schrödinger's factorization method solves for energy eigenstates algebraically, and Witten later generalized it to supersymmetric quantum mechanics. A common misconception holds that supersymmetry-breaking potentials have Hamiltonians that cannot be factorized into a factorization chain. In this work, we show they can — supersymmetry breaking is a property of the superpotential, not the potential — and we provide a numerical method to construct the factorization chain for any well-behaved one-dimensional potential.",
      pagesPath: "/publications/pages",
      pageCount: 11,
    },
  ]

  return (
    <div className="min-h-screen bg-black p-6 transition-colors duration-500 md:p-8 lg:p-8 min-[1710px]:lg:p-12">
      <div className="mx-auto w-full max-w-none min-[1710px]:max-w-[1710px]">
        <div className="grid gap-8 min-[1710px]:grid-cols-[300px_1fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <div className="h-48 w-48 overflow-hidden rounded-full border-2 border-white transition-colors duration-500 md:h-64 md:w-64">
              <Image
                src="/profile.jpeg"
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

            <div className="flex flex-1 flex-col">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/60 transition-colors duration-500 mb-4">
                Where I've Been
              </h2>
              <div className="flex flex-1 flex-col justify-between gap-5">
                <div className="flex items-center gap-4">
                  <Image
                    src="/logos/nasa-logo.png"
                    alt="NASA"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <p className="text-base font-bold text-white transition-colors duration-500">NASA</p>
                    <p className="text-sm text-white/70 transition-colors duration-500">Product Designer and PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Image
                    src="/logos/mit-logo.png"
                    alt="MIT"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <p className="text-base font-bold text-white transition-colors duration-500">MIT</p>
                    <p className="text-sm text-white/70 transition-colors duration-500">Policy Analyst</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Image
                    src="/logos/nsf-logo.png"
                    alt="NSF"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <p className="text-base font-bold text-white transition-colors duration-500">NSF</p>
                    <p className="text-sm text-white/70 transition-colors duration-500">Data Science Intern</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Image
                    src="/logos/gt-logo.png"
                    alt="Georgia Tech"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <p className="text-base font-bold text-white transition-colors duration-500">Georgia Tech</p>
                    <p className="text-sm text-white/70 transition-colors duration-500">Product Manager</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Image
                    src="/logos/georgetown-logo.png"
                    alt="Georgetown University"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <p className="text-base font-bold text-white transition-colors duration-500">Georgetown</p>
                    <p className="text-sm text-white/70 transition-colors duration-500">Quantum Researcher</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSongPlaying((playing) => !playing)}
                  className="group flex w-full items-center gap-4 rounded-xl border-2 border-white/15 bg-white/5 p-4 text-left transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    {isSongPlaying ? (
                      <Square className="h-4 w-4 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    )}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold uppercase tracking-wider text-white">
                      {isSongPlaying ? "Now Playing" : "Play Me"}
                    </span>
                    <span className="block text-xs text-white/60">
                      {isSongPlaying ? "Maironis — Nine" : "A track worth a listen"}
                    </span>
                  </span>
                  {isSongPlaying ? (
                    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
                      <span className="w-[3px] rounded-full bg-white [animation:equalizer_0.9s_ease-in-out_infinite]" />
                      <span className="w-[3px] rounded-full bg-white [animation:equalizer_0.9s_ease-in-out_0.3s_infinite]" />
                      <span className="w-[3px] rounded-full bg-white [animation:equalizer_0.9s_ease-in-out_0.6s_infinite]" />
                    </span>
                  ) : (
                    <span className="relative flex h-2.5 w-2.5" aria-hidden>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                    </span>
                  )}
                </button>
                {isSongPlaying && (
                  <div className="pointer-events-none fixed -left-[9999px] h-px w-px overflow-hidden opacity-0">
                    <div id="song-player" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-500 lg:text-3xl">
                    WORK
                  </h2>
                  <p className="mt-2 text-sm text-white/60 transition-colors duration-500">
                    Toggle between shipped projects, publications, and written deep-dives.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-medium uppercase tracking-wide text-white/60">
                  <button
                    type="button"
                    onClick={() => goToSection("projects")}
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
                    onClick={() => goToSection("publications")}
                    className={`rounded-full px-3 py-1 transition-all duration-200 ${
                      activeTab === "publications"
                        ? "bg-white text-black shadow-sm"
                        : "text-white/60 hover:bg-white/10"
                    }`}
                  >
                    Publications
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSection("tutorials")}
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

              <div ref={emblaRef} className="cursor-grab overflow-hidden active:cursor-grabbing">
                <div className="-ml-8 flex items-start">
                  {/* Slide 1: Projects */}
                  <div className="min-w-0 flex-[0_0_100%] pl-8">
                    <div className="grid gap-6 pt-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project) => {
                        const isYouTube = isYouTubeUrl(project.link)
                        const videoId = isYouTube ? getYouTubeVideoId(project.link) : null
                        // Get timestamp from URL, or default to 60 seconds (middle-ish for most videos)
                        const startTime = isYouTube ? (getYouTubeTimestamp(project.link) ?? 60) : 0
                        const shouldShowVideo = isYouTube && videoId

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
                  </div>

                  {/* Slide 2: Publications */}
                  <div className="min-w-0 flex-[0_0_100%] pl-8">
                    <div className="space-y-12 py-8">
                      {publications.map((publication) => (
                        <div
                          key={publication.id}
                          className="grid items-start gap-10 lg:grid-cols-[minmax(0,520px)_1fr]"
                        >
                          <div className="h-[65vh] space-y-4 overflow-y-auto rounded-lg">
                            {Array.from({ length: publication.pageCount }, (_, i) => (
                              <Image
                                key={i}
                                src={`${publication.pagesPath}/page-${i + 1}.jpg`}
                                alt={`${publication.title} — page ${i + 1}`}
                                width={1200}
                                height={1553}
                                className="w-full rounded-lg shadow-2xl"
                                priority={i === 0}
                              />
                            ))}
                          </div>

                          <div className="space-y-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                              Publication
                            </p>
                            <h3 className="text-2xl font-bold uppercase leading-snug tracking-tight text-white lg:text-3xl">
                              {publication.title}
                            </h3>
                            <p className="text-sm font-medium text-white/80">{publication.authors}</p>
                            <p className="text-xs uppercase tracking-wide text-white/50">{publication.venue}</p>
                            <p className="text-base leading-relaxed text-white/70">{publication.description}</p>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                              <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-white p-2 shadow-2xl">
                                <Image
                                  src="/publications/figure-a.png"
                                  alt="Auxiliary potentials of the factorization chain near the potential minimum"
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                              <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-white p-2 shadow-2xl">
                                <Image
                                  src="/publications/figure-b.png"
                                  alt="Auxiliary potentials of the factorization chain over the full range"
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slide 3: Written Tutorials */}
                  <div className="min-w-0 flex-[0_0_100%] pl-8">
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
                  </div>
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

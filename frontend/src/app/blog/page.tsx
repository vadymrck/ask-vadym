import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog | Ask Vadym — AI QA Engineer",
  description:
    "Articles on QA automation, Playwright, Pytest, API testing, and AI-assisted testing by Vadym Marochok.",
  openGraph: {
    title: "Blog | Ask Vadym — AI QA Engineer",
    description:
      "Articles on QA automation, Playwright, Pytest, API testing, and AI-assisted testing by Vadym Marochok.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header currentPage="blog" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-10">Blog</h1>

        <div className="flex flex-col gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="relative w-full sm:w-48 sm:shrink-0 aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <time
                      dateTime={post.date}
                      className="text-xs text-[var(--text-secondary)]"
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2 className="mt-1 text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)]">
                    Read article
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

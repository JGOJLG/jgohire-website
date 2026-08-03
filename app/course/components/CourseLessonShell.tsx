"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import IntroductionLesson from "./IntroductionLesson";
import AboutAuthorLesson from "./AboutAuthorLesson";
import MindsetLesson from "./MindsetLesson";
import AITipsLesson from "./AITipsLesson";
import NetworkingLesson from "./NetworkingLesson";
import ProfilePhotoLesson from "./ProfilePhotoLesson";
import BannerPhotoLesson from "./BannerPhotoLesson";
import HeadlineLesson from "./HeadlineLesson";
import LocationLesson from "./LocationLesson";
import AboutSectionLesson from "./AboutSectionLesson";
import ExperienceLesson from "./ExperienceLesson";
import EducationLesson from "./EducationLesson";
import VolunteerExperienceLesson from "./VolunteerExperienceLesson";
import CertificationsProjectsPublicationsLesson from "./CertificationsProjectsPublicationsLesson";
import SkillsLesson from "./SkillsLesson";
import {
  courseLessons,
  courseModules,
  type CourseLesson,
} from "../data/courseLessons";

type CourseLessonShellProps = {
  lesson: CourseLesson;
  lessonIndex: number;
};

export default function CourseLessonShell({
  lesson,
  lessonIndex,
}: CourseLessonShellProps) {
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);

  const totalLessons = courseLessons.length;
  const currentNumber = lessonIndex + 1;
  const progress = Math.round((currentNumber / totalLessons) * 100);

  const previousLesson =
    lessonIndex > 0 ? courseLessons[lessonIndex - 1] : null;

  const nextLesson =
    lessonIndex < totalLessons - 1
      ? courseLessons[lessonIndex + 1]
      : null;

  useEffect(() => {
    if (!isCourseMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsCourseMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isCourseMenuOpen]);

  function renderLesson() {
    if (lesson.slug === "introduction") {
      return <IntroductionLesson />;
    }

    if (lesson.slug === "about-the-author") {
      return <AboutAuthorLesson />;
    }

    if (lesson.slug === "mindset") {
      return <MindsetLesson />;
    }

    if (lesson.slug === "ai-tips") {
      return <AITipsLesson />;
    }

    if (lesson.slug === "networking-on-linkedin") {
      return <NetworkingLesson />;
    }

    if (lesson.slug === "profile-photo") {
      return <ProfilePhotoLesson />;
    }

    if (lesson.slug === "banner-photo") {
      return <BannerPhotoLesson />;
    }

    if (lesson.slug === "headline") {
      return <HeadlineLesson />;
    }

    if (lesson.slug === "your-location") {
      return <LocationLesson />;
    }

    if (lesson.slug === "about-section") {
      return <AboutSectionLesson />;
    }

    if (lesson.slug === "experience") {
      return <ExperienceLesson />;
    }

    if (lesson.slug === "education") {
      return <EducationLesson />;
    }

    if (lesson.slug === "volunteer-experience") {
      return <VolunteerExperienceLesson />;
    }

    if (lesson.slug === "certifications-projects-publications") {
      return <CertificationsProjectsPublicationsLesson />;
    }

    if (lesson.slug === "skills") {
      return <SkillsLesson />;
    }

    return (
      <section className="course-empty-lesson">
        <span>✦</span>
        <h2>{lesson.title}</h2>
        <p>This lesson page is ready for its existing content.</p>
      </section>
    );
  }

  return (
    <main className="course-shell-page">
      <header className="course-shell-header">
        <Link href="/course" className="course-shell-brand">
          <span>JGO HIRE</span>
          <small>LinkedIn Optimization Guide</small>
        </Link>

        <div className="course-shell-header-actions">
          <span className="course-shell-lesson-count">
            Lesson {currentNumber} of {totalLessons}
          </span>

          <button
            type="button"
            className="course-shell-menu-button"
            onClick={() => setIsCourseMenuOpen(true)}
            aria-expanded={isCourseMenuOpen}
            aria-controls="course-shell-menu"
          >
            <span aria-hidden="true" className="course-shell-menu-icon">
              <i />
              <i />
              <i />
            </span>
            Course Menu
          </button>
        </div>
      </header>

      <section className="course-shell-main">
        <div className="course-shell-title-row">
          <div>
            <p>LinkedIn Optimization Guide</p>
            <h1>{lesson.title}</h1>
          </div>

          <Link href="/course" className="course-shell-home-link">
            Course Home
          </Link>
        </div>

        <section className="course-shell-lesson-area">
          {renderLesson()}
        </section>

      </section>

      <footer className="course-shell-progress-footer">
        <div className="course-shell-progress-inner">
          <span>Overall Progress</span>

          <div className="course-shell-progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          <strong>{progress}%</strong>
        </div>
      </footer>

      {isCourseMenuOpen && (
        <div
          className="course-shell-menu-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsCourseMenuOpen(false);
            }
          }}
        >
          <aside
            id="course-shell-menu"
            className="course-shell-menu-panel"
            aria-label="Course menu"
          >
            <div className="course-shell-menu-top">
              <div>
                <p>LinkedIn Optimization Guide</p>
                <h2>Course Menu</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsCourseMenuOpen(false)}
                aria-label="Close course menu"
              >
                ×
              </button>
            </div>

            <div className="course-shell-menu-progress">
              <div>
                <span>Your Progress</span>
                <strong>{progress}%</strong>
              </div>

              <div>
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <nav className="course-shell-menu-lessons">
              {courseModules.map((moduleName) => (
                <section key={moduleName}>
                  <h3>{moduleName}</h3>

                  {courseLessons
                    .filter((item) => item.module === moduleName)
                    .map((item) => {
                      const itemIndex = courseLessons.findIndex(
                        (lessonItem) => lessonItem.slug === item.slug
                      );

                      const isActive = item.slug === lesson.slug;

                      return (
                        <Link
                          key={item.slug}
                          href={`/course/${item.slug}`}
                          onClick={() => setIsCourseMenuOpen(false)}
                          className={
                            isActive
                              ? "course-shell-menu-link course-shell-menu-link-active"
                              : "course-shell-menu-link"
                          }
                        >
                          <span>
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>

                          <p>{item.title}</p>

                          <span aria-hidden="true">
                            {isActive ? "→" : "○"}
                          </span>
                        </Link>
                      );
                    })}
                </section>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </main>
  );
}

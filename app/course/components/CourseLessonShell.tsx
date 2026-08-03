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
import RecommendationsLesson from "./RecommendationsLesson";
import OpenToWorkLesson from "./OpenToWorkLesson";
import ConnectionsLesson from "./ConnectionsLesson";
import AdditionalSectionsLesson from "./AdditionalSectionsLesson";
import WrapUpLesson from "./WrapUpLesson";
import BonusContentLesson from "./BonusContentLesson";
import LeaveAReviewLesson from "./LeaveAReviewLesson";

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

  const progress = Math.round(
    (currentNumber / totalLessons) * 100
  );

  useEffect(() => {
    if (!isCourseMenuOpen) return;

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
    switch (lesson.slug) {
      case "introduction":
        return <IntroductionLesson />;

      case "about-the-author":
        return <AboutAuthorLesson />;

      case "mindset":
        return <MindsetLesson />;

      case "ai-tips":
        return <AITipsLesson />;

      case "networking-on-linkedin":
        return <NetworkingLesson />;

      case "profile-photo":
        return <ProfilePhotoLesson />;

      case "banner-photo":
        return <BannerPhotoLesson />;

      case "headline":
        return <HeadlineLesson />;

      case "your-location":
        return <LocationLesson />;

      case "about-section":
        return <AboutSectionLesson />;

      case "experience":
        return <ExperienceLesson />;

      case "education":
        return <EducationLesson />;

      case "volunteer-experience":
        return <VolunteerExperienceLesson />;

      case "certifications-projects-publications":
        return <CertificationsProjectsPublicationsLesson />;

      case "skills":
        return <SkillsLesson />;

      case "recommendations":
        return <RecommendationsLesson />;

      case "open-to-work":
        return <OpenToWorkLesson />;

      case "connections":
        return <ConnectionsLesson />;

      case "additional-sections":
        return <AdditionalSectionsLesson />;

      case "wrap-up":
        return <WrapUpLesson />;

      case "bonus-content":
        return <BonusContentLesson />;

      case "leave-a-review":
        return <LeaveAReviewLesson />;

      default:
        return (
          <section className="course-empty-lesson">
            <span>✦</span>
            <h2>{lesson.title}</h2>
            <p>
              This lesson page is ready for its existing content.
            </p>
          </section>
        );
    }
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
          >
            <span className="course-shell-menu-icon">
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

          <Link
            href="/course"
            className="course-shell-home-link"
          >
            Course Home
          </Link>
        </div>

        <section className="course-shell-lesson-area">
          {renderLesson()}
        </section>
      </section>
      <footer className="course-shell-progress-footer">
        <div className="course-shell-progress-inner">
          <span>
            Overall Progress
          </span>

          <div className="course-shell-progress-track">
            <span
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <strong>
            {progress}%
          </strong>
        </div>
      </footer>


      {isCourseMenuOpen && (
        <div
          className="course-shell-menu-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setIsCourseMenuOpen(false);
            }
          }}
        >
          <aside
            className="course-shell-menu-panel"
            id="course-shell-menu"
          >
            <div className="course-shell-menu-top">
              <div>
                <p>
                  LinkedIn Optimization Guide
                </p>

                <h2>
                  Course Menu
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsCourseMenuOpen(false)
                }
              >
                ×
              </button>
            </div>


            <div className="course-shell-menu-progress">
              <div>
                <span>
                  Your Progress
                </span>

                <strong>
                  {progress}%
                </strong>
              </div>

              <div>
                <span
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>


            <nav className="course-shell-menu-lessons">
              {courseModules.map(
                (moduleName) => (
                  <section key={moduleName}>
                    <h3>
                      {moduleName}
                    </h3>

                    {courseLessons
                      .filter(
                        (item) =>
                          item.module === moduleName
                      )
                      .map((item, index) => (
                        <Link
                          key={item.slug}
                          href={`/course/${item.slug}`}
                          onClick={() =>
                            setIsCourseMenuOpen(false)
                          }
                          className={
                            item.slug === lesson.slug
                              ? "course-shell-menu-link course-shell-menu-link-active"
                              : "course-shell-menu-link"
                          }
                        >
                          <span>
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <p>
                            {item.title}
                          </p>

                          <span>
                            {item.slug === lesson.slug
                              ? "→"
                              : "○"}
                          </span>
                        </Link>
                      ))}
                  </section>
                )
              )}
            </nav>
          </aside>
        </div>
      )}
    </main>
  );
}
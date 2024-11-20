import React, { useState, useEffect, useRef } from 'react';
import { Container } from "./styles";
import githubIcon from "../../assets/github.svg";
import externalLink from "../../assets/external-link.svg";
import ScrollAnimation from "react-animate-on-scroll";
import Modal from '../Modal/Modal';
import Project1 from '../../assets/Frame 1.jpg'
import Project2 from '../../assets/Frame 2.jpg'
import Project3 from '../../assets/Frame 3.jpg'
import Project5 from '../../assets/Frame 5.jpg'

// Define TypeScript types
interface ProjectType {
  title: string;
  description: string;
  imageSrc: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
}

const projects: ProjectType[] = [
  {
    title: 'News Scraper and Rephraser',
    description: 'The site utilizes scraping and ChatGPT to collect data from over 15 different websites. This data is then rephrased using ChatGPT and stored in a database. Afterward, statistical information is displayed on the frontend, providing clients with insights to track the performance and results of the scraping process',
    imageSrc: Project1,
    techStack: ['Python', 'Scrapy', 'Django', 'MySQL', 'DjangoRestFraamework'],
    githubLink: '',
    liveLink: 'https://upload.newsbriefapp.com/news/dashboard/'
  },
  {
    title: 'Property Scraping',
    description: 'In this project, I developed a web scraping solution using Scrapy to extract data from two distinct websites. The scraping process involved collecting a variety of content, which was then organized into specific categories and subcategories based on defined filters.',
    imageSrc: Project2,
    techStack: ['Python', 'Scrapy', 'Django', 'DjangoRestFramework', 'Javascript', 'Reactjs'],
    githubLink: '',
    liveLink: ''
  }
];

export function Project() {
  // Projects File
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Set up IntersectionObserver to show tooltip
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTooltipVisible(true);
        } else {
          setTooltipVisible(false);
        }
      });
    }, { threshold: 0.5 });

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Container id="project">
      <h2>My Projects</h2>
      <div className="projects">
        {projects.map((project, index) => (
          <ScrollAnimation key={index} animateIn="flipInX">
            <div
              className="project"
              ref={el => projectRefs.current[index] = el}
            >
              <header>
                <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"> 
                  <title>Folder</title> 
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path> 
                </svg>
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    <img src={githubIcon} alt="GitHub" />
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noreferrer">
                    <img src={externalLink} alt="Live Site" />
                  </a>
                </div>
              </header>
              <div className="body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-image" onClick={() => openModal(project.imageSrc)}>
                  <img src={project.imageSrc} alt={project.title} />
                  {tooltipVisible && (
                    <div className="tooltip">
                      Click on the image to zoom in
                    </div>
                  )}
                </div>
              </div>
              <footer>
                <ul className="tech-list">
                  {project.techStack.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ul>
              </footer>
            </div>
          </ScrollAnimation>
        ))}
      </div>
      <Modal imageSrc={selectedImage} onClose={closeModal} />
    </Container>
  );
}

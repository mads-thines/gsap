// Utilities
import * as util from './common.js';
import { TimelineMax, CSSRulePlugin } from "gsap";

// Variables
export let tlProjects, tlProject, tlProjectsCTA, tlProjectLoader, tlCircles;
let projects = document.querySelector('.projects');
let project = document.querySelectorAll('.project');

// Initialize the Timeline
tlProjects = new TimelineMax();
tlProject = new TimelineMax({ repeat: -1, repeatDelay: 2 });
tlCircles = new TimelineMax({ repeat: -1 });
tlProjects.set(projects, { autoAlpha: 1 });


// Circles
tlCircles;

// Project
project.forEach((element) => {

  // Creating Timelines
  tlProjectsCTA = new TimelineMax();
  tlProjectLoader = new TimelineMax({ paused: true });

  // Project Selectors
  const projectClasses = element.getAttribute('class').split(' ');
  const projectClass = projectClasses[1];
  const pixel = element.querySelectorAll('.pixel');
  const pixels = element.querySelector('.project-pixels');
  const projectTitle = element.querySelector('.project-title');
  const projectSubtitle = element.querySelector('.project-subtitle');
  const projectImage = element.querySelector('.project-image');
  // CTA
  //const projectLinkButton = element.querySelector('.button');
  const projectLink = element.querySelector('.button-container');
  const projectLinkSpan = element.querySelectorAll('.bp');
  const projectLinkText = element.querySelector('.bp-text');
  // Loader
  const loader = element.querySelector('.loader');

  // CTA
  tlProjectsCTA
  .to(projectSubtitle, 0.3, { autoAlpha: 0, yPercent: 100, ease: Back.easeOut })
  .staggerFrom(projectLinkSpan, 0.3, { autoAlpha: 0, yPercent: -100, ease: Back.easeOut }, 0.1)
  .from(projectLinkText, 0.3, { autoAlpha: 0, x: '-100%', ease: Power4.easeInOut }, '-=0.2');

  // Loader
  tlProjectLoader
  //.to([projectImageBefore, projectImageAfter], 0.3, { cssRule: { opacity: 0 }, ease: Power4.easeInOut })
  .fromTo(loader, 5,
    { strokeDasharray: 547, strokeDashoffset: 547 },
    { strokeDasharray: 547, strokeDashoffset: 0, ease: Power0.easeNone })
  .to(loader, 0.5, { autoAlpha: 0, onComplete: util.resumeProjects });
  //.to([projectImageBefore, projectImageAfter], 0.3, { cssRule: { opacity: 1 }, ease: Power4.easeInOut }, '-=0.4');

  // Main
  tlProject
  .set(element, { zIndex: 1 })
  .set([projectTitle, projectSubtitle, pixel], { autoAlpha: 0 })
  .fromTo(projectImage, 0.4,
    { autoAlpha: 0, xPercent: '-200' },
    { autoAlpha: 1, xPercent: '-10', ease: Power4.easeInOut, onStart: util.updateClass, onStartParams: [projectClass] }
  )
  .add('imageIn')
  .staggerFromTo(pixel, 0.3, { autoAlpha: 0, x: '-=10' }, { autoAlpha: 1, x: '0', ease: Power4.easeInOut }, 0.02,
    '-=0.2')
  .add('pixelsIn')
  .fromTo(projectTitle, 0.7, { autoAlpha: 0, xPercent: '-50' }, { autoAlpha: 1, xPercent: '-5' }, '-=0.4')
  .fromTo(projectSubtitle, 0.7, { autoAlpha: 0, xPercent: '-50' }, { autoAlpha: 1, xPercent: '-2' }, '-=0.5')
  .add('titleIn')
  .add(tlProjectsCTA, '+=2')
  .to(projectTitle, 4.3, { xPercent: '+=5', ease: Linear.easeNone }, 'titleIn-=0.1')
  .to(projectSubtitle, 4.3, { xPercent: '+=2', ease: Linear.easeNone }, 'titleIn-=0.2')
  .add('titleOut')
  .to(projectImage, 5,
    {
      xPercent: '0',
      ease: Linear.easeNone,
      onComplete: util.pauseProjects,
      onCompleteParams: [projectClass, tlProjectLoader]
    }, 'imageIn')
  .add('imageOut')
  .to(pixels, 4.1, { x: '-5', ease: Linear.easeNone }, 'pixelsIn')
  .to([projectTitle, projectSubtitle, projectLink], 0.5,
    { autoAlpha: 0, xPercent: '+=10', ease: Power4.easeInOut }, 'titleOut')
  .to(projectImage, 0.4, { autoAlpha: 0, xPercent: '+=80', ease: Power4.easeInOut }, 'imageOut');

  tlProjects.add(tlProject);

});

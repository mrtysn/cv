import React from "react";
import SectionItem from "../components/SectionItem";
import SectionTitle from "../components/SectionTitle";

class Education extends React.Component {
  render() {
    return (
      <div>
        <SectionTitle title={"EDUCATION"} />
        <SectionItem
          companyTitle={
            <a
              href="https://wayne.edu/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Wayne State University
            </a>
          }
          location={"Michigan, United States"}
          jobTitle={"PhD ABD, Computer Science"}
          startDate={"2018"}
          endDate={"2021"}
          items={[
            <div>Successfully passed Ph.D. Qualifying Exam – 2020</div>,
            <span>
              Instructor for <i>Problem Solving and Programming Laboratory</i>{" "}
              (C++)
            </span>,
            <span>
              Teaching Assistant for <i>Introduction to Deep Learning</i>{" "}
              (Tensorflow), <i>Data Mining: Algorithms and Applications</i>{" "}
              (Python, R)
              {", "}
              <i>Intelligent Systems: Algorithms and Tools</i> (R, Weka){", "}
              <i>Python Programming</i> (Python){", "}
              <i>
                Introduction to Programming and Computation for Engineers
              </i>{" "}
              (MATLAB)
            </span>,
            <div>
              Research Projects:
              <div style={{ marginTop: "5px" }}>
                {"◦"}&nbsp;&nbsp;
                <i>
                  Early seizure detection in neonatal brains with EEG data;
                </i>{" "}
                using structural & functional brain network models, and deep
                learning & wavelet-based methodologies to perform temporal &
                spectral analyses
              </div>
              <div style={{ marginTop: "5px", marginBottom: "10px" }}>
                {"◦"}&nbsp;&nbsp;
                <i>Disease subtyping using genomic and clinical data;</i>{" "}
                integrating datasets from multiple cohorts, and identifying
                cancer subtypes via bioinformatics, data mining, and machine
                learning
              </div>
            </div>,
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://bogazici.edu.tr/en-US"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Boğaziçi University
            </a>
          }
          location={"İstanbul, Turkey"}
          jobTitle={"Master of Science, Computer Engineering – Incomplete"}
          startDate={"2016"}
          endDate={"2018"}
          items={[
            <span>
              Co-founded the reading group{" "}
              <a
                href="https://deepboun.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deep Learning Boun
              </a>
            </span>,
            <span>
              Prepared and graded homework as a Student Assistant for{" "}
              <a
                href="https://www.cmpe.boun.edu.tr/courses/cmpe300"
                target="_blank"
                rel="noopener noreferrer"
              >
                CmpE 300: Analysis of Algorithms
              </a>
            </span>,
            <span>
              Attended the Convex Optimization reading group of the{" "}
              <a
                href="https://www.cmpe.boun.edu.tr/perceptual-intelligence-laboratory-pilab"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perceptual Intelligence Laboratory
              </a>
            </span>,
            <span>
              Spoke at the{" "}
              <a
                href="https://www.eventbrite.com/e/garaj-ama-machinelearning-tickets-30715371503"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask Me Anything #machinelearning
              </a>{" "}
              event and the{" "}
              <a
                href="https://www.facebook.com/events/1853350238248699/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learning to Learn
              </a>{" "}
              panel
            </span>,
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://bogazici.edu.tr/en-US"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Boğaziçi University
            </a>
          }
          location={"İstanbul, Turkey"}
          jobTitle={"Bachelor of Science, Computer Engineering"}
          startDate={"2012"}
          endDate={"2016"}
          items={[
            <span>Honors: Dean’s Honor List; GPA: 3.28 / 4.00</span>,
            <span>
              Implemented recurrent neural networks (RNNs and LSTMs) in Python
              from scratch and generated new poems, plays in the style of
              William Shakespeare and Nazım Hikmet for my{" "}
              <a
                href="https://github.com/mrtysn/lstm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bachelor Thesis
              </a>
            </span>,
            <span>
              Attended the Vision and Sports Summer School (VS3) focused on
              state-of-the-art Computer Vision applications in the industry and
              recent literature, with team-building sports activities at Czech
              Technical University – 2016
            </span>,
            <span>
              Ranked 1<sup>st</sup> in the case study competition{" "}
              <a
                href="https://www.facebook.com/media/set/?set=a.1030521643670821"
                target="_blank"
                rel="noopener noreferrer"
              >
                All-Rounder
              </a>{" "}
              by designing a puzzle game – 2016
            </span>,
            <span>
              Ranked 1<sup>st</sup> in Yıldız Technical University{" "}
              <a
                href="https://web.archive.org/web/20170507144338/http://ytukvk.org.tr:80/5-finans-ve-yazilim-gunleri/"
                target="_blank"
                rel="noopener noreferrer"
              >
                5<sup>th</sup> Finance and Software Days
              </a>{" "}
              Code Contest – 2014
            </span>,
          ]}
        />
      </div>
    );
  }
}

export default Education;

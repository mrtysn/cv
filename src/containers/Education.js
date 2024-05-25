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
          relevantItems={[
            "MGG 7010: Molecular Biology and Genetics",
            "PSY 5040: Cognitive Neuroscience",
            "CSC 7991: Introduction to Deep Learning",
            "CSC 6860: Digital Image Processing and Analysis",
            "CSC 7810: Data Mining: Algorithms and Applications",
            "CSC 5800: Intelligent Systems: Algorithms and Tools",
            "CSC 7991: Advanced Cyber-Human Interactions",
            "CSC 7991: Information Retrieval",
            "CSC 8260: Seminar in Energy Efficient Mobile/Cloud Computing",
            "CSC 5591: Engineering Innovation and Entrepreneurship",
            "CSC 5430: Game Programming & Design",
            "CSC 5591: Unix Security with Shell Programming",
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
          relevantItems={[
            "CmpE 59M: Interaction Design",
            "CmpE 59H: Bioinformatics",
            "CmpE 537: Computer Vision",
            "CmpE 557: Complex Systems",
            "CmpE 547: Bayesian Statistics and Machine Learning",
            "IE 501: Optimization Techniques",
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://www.cvut.cz/en"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Czech Technical University
            </a>
          }
          location={"Prague, Czech Republic"}
          jobTitle={
            <a
              href="http://cmp.felk.cvut.cz/summerschool2016/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Vision and Sports Summer School (VS3)
            </a>
          }
          endDate={"08/2016"}
          items={[
            <span>
              Attended a summer school focused on state-of-the-art Computer
              Vision applications in the industry and recent literature, with
              team-building activities such as ultimate frisbee, orienteering,
              climbing, archery, and unihockey
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
          relevantItems={[
            "CmpE 544: Pattern Recognition",
            "CmpE 545: Artificial Neural Networks",
            "CmpE 540: Principles of Artificial Intelligence",
            "CmpE 482: Numerical Linear Algebra and Its Applications",
            "CmpE 58Z: Introduction to Biometrics",
            "CmpE 489: Cognitive Science",
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://egelisesi.k12.tr/school-profile"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Özel Ege Lisesi
            </a>
          }
          location={"İzmir, Turkey"}
          jobTitle={"High School"}
          startDate={"2008"}
          endDate={"2012"}
          items={[
            <span>
              Represented Slovenia in the SOCHUM Committee of{" "}
              <a
                href="https://www.hnmun.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Harvard National Model United Nations (HNMUN)
              </a>{" "}
              – 2011
            </span>,
            <span>
              Led the winning team at İzmir Gelişim College’s Mathematics League
              – 2011 & 2012
            </span>,
            <span>
              Won two medals at University of Waterloo's{" "}
              <a
                href="https://www.cemc.uwaterloo.ca/contests/past_contests.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                math contests
              </a>{" "}
              – 2011 & 2012
            </span>,
            <span>
              Participated in{" "}
              <a
                href="https://artofproblemsolving.com/wiki/index.php/AMC_12_Problems_and_Solutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                American Mathematics Competition
              </a>{" "}
              and{" "}
              <a
                href="http://matolimp.akdeniz.edu.tr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                National Antalya Mathematics Olympics
              </a>{" "}
              – 2010 & 2011
            </span>,
          ]}
        />
      </div>
    );
  }
}

export default Education;

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
            <div>
              Successfully passed the <b>Ph.D. Qualifying Exam</b> in November
              2020: Research project titled
              <i>
                'Early Seizure Detection of the Neonatal Brain Using
                Electroencephalography Data'
              </i>{" "}
              employed techniques such as structural & functional brain network
              analysis, EEG data preprocessing, artifact removal, and temporal &
              spectral examination through deep learning & wavelet-based
              methodologies.
            </div>,
            <div>
              <b style={{ color: "rgba(0,0,0,.87)" }}>Research project:</b>
              &nbsp;&nbsp;Disease subtyping using genomic and clinical data.
              Identifying cancer subtypes via data mining and machine learning
              methodologies. Integrating existing datasets from multiple cohorts
              to better understand the cancer subtypes. Transfer learning
              between different cancer types.
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
            "CSC 5431: Game Programming & Design Lab",
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
                deep-learning @ boun
              </a>
            </span>,
            <span>
              Student assistant for{" "}
              <a
                href="https://www.cmpe.boun.edu.tr/courses/cmpe300"
                target="_blank"
                rel="noopener noreferrer"
              >
                CmpE 300: Analysis of Algorithms
              </a>
              . Prepared and graded homework questions
            </span>,
            <span>
              Attended the meetings of the convex-optimization reading group of
              the{" "}
              <a
                href="https://www.cmpe.boun.edu.tr/perceptual-intelligence-laboratory-pilab"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perceptual Intelligence Laboratory (PILAB)
              </a>
            </span>,
            <span>
              Invited speaker at the event{" "}
              <a
                href="https://www.eventbrite.com/e/garaj-ama-machinelearning-tickets-30715371503"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask Me Anything #machinelearning
              </a>
            </span>,
            <span>
              Invited speaker at the panel{" "}
              <a
                href="https://www.facebook.com/events/1853350238248699/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learning to Learn
              </a>
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
              Vision and Sports Summer School (VS3) – 2016
            </a>
          }
          endDate={"08/2016"}
          items={[
            <span>
              <a
                href="http://cmp.felk.cvut.cz/summerschool2016/"
                target="_blank"
                rel="noopener noreferrer"
              >
                VS3
              </a>
              : A summer school that covers state-of-the-art computer vision
              applications and recently published conference papers as well as
              various sports activities – archery, orienteering, climbing,
              ultimate frisbee, floorball (unihockey)
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
              <b style={{ color: "rgba(0,0,0,.87)" }}>Bachelor Thesis:</b>{" "}
              <a
                href="https://github.com/mrtysn/lstm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learning Sequences Using RNNs and LSTMs
              </a>
              . Deep poem generation similar to the style of a poet. Step by
              step activation analysis of LSTM cells' gates
            </span>,
            <span>
              Ranked 1<sup>st</sup> in the operations round of the case study
              competition{" "}
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
                5. Finance and Software Days
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
          jobTitle={"Private Anatolian High School"}
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
              Team captain of İzmir Gelişim College’s 1<sup>st</sup> and 2
              <sup>nd</sup> Mathematics League winning team – 2011 & 2012
            </span>,
            <span>
              University of Waterloo – Fermat, Hypatia, and Senior{" "}
              <a
                href="https://www.cemc.uwaterloo.ca/contests/past_contests.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                math contests
              </a>{" "}
              – two medals and several honor rolls – 2011 & 2012
            </span>,
            <span>
              Participated in American Mathematics Competition{" "}
              <a
                href="https://artofproblemsolving.com/wiki/index.php/AMC_12_Problems_and_Solutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                AMC12B
              </a>{" "}
              – 2011 & 2012
            </span>,
            <span>
              Participated in{" "}
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

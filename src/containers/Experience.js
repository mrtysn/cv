import React from "react";
import SectionItem from "../components/SectionItem";
import SectionTitle from "../components/SectionTitle";

class Experience extends React.Component {
  render() {
    return (
      <div>
        <SectionTitle title={"EXPERIENCE"} />
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
          jobTitle={"Graduate Teaching Assistant, Instructor"}
          startDate={"08/2018"}
          items={[
            <span>
              Teaching Assistant for{" "}
              <i>CSC 7760: Introduction to Deep Learning</i> (Tensorflow)
            </span>,
            <span>
              Teaching Assistant for{" "}
              <i>CSC 7810: Data Mining: Algorithms and Applications</i> for 2
              terms
            </span>,
            <span>
              Teaching Assistant for{" "}
              <i>CSC 5800: Intelligent Systems: Algorithms and Tools</i> (R,
              Weka)
            </span>,
            <span>
              Teaching Assistant for <i>CSC 4992: Python Programming</i>
            </span>,
            <span>
              Teaching Assistant for{" "}
              <i>
                BE 1500: Introduction to Programming and Computation for
                Engineers
              </i>{" "}
              (MATLAB) for 3 terms
            </span>,
            <span>
              Instructor for{" "}
              <i>CSC1101: Problem Solving and Programming Laboratory</i> (C++)
            </span>,
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://appliedai.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              appliedAI
            </a>
          }
          location={"İstanbul, Turkey"}
          jobTitle={"CTO"}
          startDate={"06/2017"}
          endDate={"01/2018"}
          items={[
            <span>
              Led the technical team of a newly found startup at the accelerator{" "}
              <a
                href="https://www.garantibbvapartners.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Garanti BBVA Partners
              </a>
            </span>,
            "Grew the B2B data analytics and artificial intelligence solution platform appliedAI to 2700+ monthly active users",
            "Curated a niche database of 3000+ AI companies, their application areas and their customer references via web crawling and organic user acquisition",
            <span>
              Maintained the full stack of{" "}
              <a
                href="https://appliedai.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                appliedAI.com
              </a>{" "}
              with ReactJS, MobX, Django REST Framework, and PostgreSQL.
              Deployment with zero downtime using Heroku. Converted the
              front-end MVP from Angular to React
            </span>,
            "Provided a lead generation and lead nurturing outlet to customers by establishing a PoC pipeline with potential vendors to work with",
            "Mentored junior developers on front-end development and web crawling",
            "Coordinated the core product development between the core startup team, interns, and freelance developers",
            <span>
              Talked about "Quantifiable AI" at the online AI conference{" "}
              <a
                href="http://ai.withthebest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI With The Best
              </a>
            </span>,
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="http://novafortis.com/index.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Novafortis Software Counseling
            </a>
          }
          location={"İzmir, Turkey"}
          jobTitle={"Software Engineer"}
          startDate={"2015"}
          endDate={"Present"}
          items={[
            <span>
              <b style={{ color: "rgba(0,0,0,.87)" }}>e-Invoice Adaptor:</b> A
              facilitating middleware software that helps taxpaying companies
              transition their accounting system to comply with the Turkish
              Revenue Administration's e-Invoice and e-Archive mandate.
              Taxpayers that opt to use a <i>private integrator</i> to issue
              e-Archive invoices may use Novafortis to monitor, validate, and
              record transactions
            </span>,
            <span>
              E-Invoice Adaptor: A facilitating middleware software that creates
              a platform for companies using "Private Integrator" to manage the
              processes of sending and receiving invoices and waybills and
              preparing e-ledgers. This application as an e-transformation
              process manager creates a bridge between the accounting practices
              of companies and the Revenue Administration, and will provide
              great convenience in the transition and maintenance of electronic
              invoicing processes.{" "}
            </span>,
            "Involved in surveying continuously changing government regulations, project design, and software implementation",
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="http://www.kns.com.tr/en"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              KNS Information Technologies
            </a>
          }
          location={"İstanbul, Turkey"}
          jobTitle={"Freelance Android Developer"}
          startDate={"03/2014"}
          endDate={"07/2017"}
          items={[
            "Wrote 12+ Android (Java) applications that enhance shoppers' mall-shopping experience. Content management system (CMS) support for promoting mall events and campaigns, sending push notifications, managing brand loyalty programs",
            "Indoor location detection and navigation suggestions inside shopping malls using Bluetooth low energy (BLE) beacons",
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="http://federation.com.tr/project/ing-orange-lab"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              ING Bank - OrangeLab
            </a>
          }
          location={"İstanbul, Turkey"}
          jobTitle={"Machine Learning Consultant"}
          startDate={"12/2016"}
          endDate={"01/2017"}
          description={
            <span>
              Roadmap planning of several projects that employ machine learning
              methodologies. Worked with data warehouse team and prepared the
              training data for each project. Worked with analytics team and
              structured the base models for preliminary predictions
            </span>
          }
          items={[
            "Predictive maintenance of automated teller machines (ATMs)",
            "Credit limit prediction of potential customers and credit limit management of current customers",
            "Net promoter score (NPS) prediction of customers",
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://www.peak.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Peak Games
            </a>
          }
          location={"İstanbul, Turkey"}
          jobTitle={"Software Engineering Intern"}
          startDate={"06/2015"}
          endDate={"09/2015"}
          items={[
            <span>
              Designed and implemented four games using{" "}
              <a
                href="https://unity.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unity3D
              </a>
              ; Color Rush, Paper Dreams, Car Crossing, Tap to Aim. Used both
              open-source assets and created new prefabs from scratch
            </span>,
            <span>
              Implemented a gamification infrastructure for{" "}
              <a
                href="https://apkpure.com/peak-box-game-arcade-machine/net.peakgames.peakbox.android"
                target="_blank"
                rel="noopener noreferrer"
              >
                Peak Box
              </a>
              , monetized it with interstitial video advertisements
            </span>,
            <span>
              Added internationalization and localization support to{" "}
              <a
                href="https://apkpure.com/peak-box-game-arcade-machine/net.peakgames.peakbox.android"
                target="_blank"
                rel="noopener noreferrer"
              >
                Peak Box
              </a>
            </span>,
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="http://www.innova.com.tr/en/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Innova IT Solutions
            </a>
          }
          location={"İstanbul, Turkey"}
          jobTitle={"Software Engineering Intern"}
          startDate={"06/2014"}
          endDate={"07/2014"}
          items={[
            <span>
              Interned at the Financial Transaction Applications department and
              developed a CRUD report portal, integrated with Microsoft
              Reporting Services (SSRS) for{" "}
              <a
                href="https://www.qnbfinansbank.com/en/"
                target="_blank"
                rel="noopener noreferrer"
              >
                an international bank
              </a>{" "}
              using ASP.NET MVC 5
            </span>,
            <span>
              Wrote Perl scripts to automatically generate HTML documents using{" "}
              <a
                href="https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor"
                target="_blank"
                rel="noopener noreferrer"
              >
                ASP.NET Razor (C# and HTML)
              </a>{" "}
              syntax for 30+ different report types instead of manually coding
              them
            </span>,
          ]}
        />
      </div>
    );
  }
}

export default Experience;

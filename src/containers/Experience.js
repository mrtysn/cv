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
              href="https://venuex.io/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              VenueX
            </a>
          }
          location={"İstanbul, Turkey (Remote)"}
          jobTitle={"Senior Software Engineer"}
          startDate={"11/2021"}
          endDate={"12/2023"}
          items={[
            <span>
              Designed and maintained ETL pipelines (using AWS Lambda, S3) to
              consume store, product, and stock data from retail merchants.
              Developed a data feed diff tool using hashing and reduced the feed
              ingestion workload by over 80%
            </span>,
            <span>
              Implemented robust data validation steps for the pipelines that
              continuously push processed retail merchant data to third-party
              APIs (Google Business Profile, Google Content API) in order to
              guarantee accurate and up-to-date product and location information
              on map and location providers (Google Maps, Google Merchant
              Center, Google Shopping)
            </span>,
            <span>
              Developed and maintained backend RESTful APIs (NestJS, TypeScript)
              to handle merchant data logic and aggregation, with custom
              validations for data consistency. Developed dashboards, report
              pages (ReactJS, TypeScript, MUI), and data integration channels
              for partner merchants. Implemented end-to-end tests for user
              scenarios using Cypress
            </span>,
            <span>
              Maintained and troubleshooted the Terraform-deployed
              infrastructure stack (EC2, ECS) and MongoDB database layer. Set up
              custom alerts (SNS) and notifications (to Slack) for early
              detection of infrastructure and database anomalies
            </span>,
            <span>
              Authored the successful proposal of a{" "}
              <i>
                <a
                  href="https://tubitak.gov.tr/en/funds/industrial/national-support-programs/1501-industrial-rd-projects-grant-programme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={"colorHighlight"}
                >
                  TEYDEB 1501 Grant
                </a>{" "}
                for Industrial R&D projects
              </i>{" "}
              from TÜBİTAK. This project focuses on using the state-of-the-art
              Computer Vision (CV) and Large Language Model (LLM) techniques to
              batch process merchant data and store location review data (from
              Google Maps) to generate insights for the merchants
            </span>,
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://olymposhq.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Olympos
            </a>
          }
          location={"Washington, United States (Remote)"}
          jobTitle={"Senior Software Engineer, Part-Time"}
          startDate={"04/2022"}
          endDate={"06/2022"}
          items={[
            <span>
              Investigated methodologies from machine learning literature to
              improve Olympos' propriety AI-powered tech talent matching
              algorithms. Worked on talent profiling, company profiling, and
              clustering problems
            </span>,
          ]}
        />
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
          jobTitle={"Instructor, Graduate Teaching Assistant"}
          startDate={"08/2018"}
          endDate={"05/2021"}
          items={[
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
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://web.archive.org/web/20190501133923/http://appliedai.com/"
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
              Led the technical team of a newly founded startup at the
              accelerator{" "}
              <a
                href="https://www.garantibbvapartners.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Garanti BBVA Partners
              </a>
              , coordinating core product development with the team, interns,
              and freelance developers
            </span>,
            "Scaled the B2B data analytics and artificial intelligence solution platform appliedAI to 2700+ monthly active users",
            "Curated a niche database of 3000+ AI companies, detailing their application areas and customers via web crawling and organic user acquisition. Established a lead generation pipeline through PoC partnerships with potential vendors",
            "Migrated the front-end MVP from Angular to React",
            <span>
              Maintained the full stack of{" "}
              <a
                href="https://web.archive.org/web/20190501133923/http://appliedai.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                appliedAI.com
              </a>{" "}
              using ReactJS, MobX, Django REST Framework, and PostgreSQL;
              achieved zero downtime deployments with Heroku
            </span>,
            "Mentored junior developers in front-end development and web crawling",
            <span>
              Talked about <i>Quantifiable AI</i> at the{" "}
              <a
                href="http://ai.withthebest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI With The Best
              </a>{" "}
              online conference
            </span>,
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
          items={[
            <div>
              Planned roadmaps for machine learning projects, collaborating with
              data warehouse and analytics teams to prepare training data and
              structure base models for preliminary predictions
              <div style={{ marginTop: "5px" }}>
                {"◦"}&nbsp;&nbsp;Predictive maintenance of automated teller
                machines (ATMs)
              </div>
              <div style={{ marginTop: "5px" }}>
                {"◦"}&nbsp;&nbsp;Credit limit prediction of potential customers
                and credit limit management of current customers
              </div>
              <div style={{ marginTop: "5px" }}>
                {"◦"}&nbsp;&nbsp;Net promoter score (NPS) prediction of
                customers
              </div>
            </div>,
          ]}
        />
        <SectionItem
          companyTitle={
            <a
              href="https://www.novafortis.com.tr/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,0,0,.87)" }}
            >
              Novafortis Software Counseling
            </a>
          }
          location={"İzmir, Turkey"}
          jobTitle={"Software Engineer, Freelance"}
          startDate={"2015"}
          endDate={"2021"}
          items={[
            <span>
              Developed an e-Invoice Adaptor middleware to help companies
              transition accounting systems for compliance with the Turkish
              Revenue Administration's e-Invoice mandate. Novafortis is used as
              a <i>private integrator</i> to issue e-Archive invoices and to
              prepare e-Ledgers as a part of the e-Transformation process
            </span>,
            "Conducted surveys on evolving government regulations, designed projects, and implemented software solutions",
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
          jobTitle={"Android Developer, Freelance"}
          startDate={"03/2014"}
          endDate={"07/2017"}
          items={[
            "Developed 12+ Android (Java) applications to enhance shoppers' mall experiences, including CMS support for promoting mall events and campaigns, sending push notifications, and managing brand loyalty programs",
            "Implemented indoor location detection and navigation using Bluetooth Low Energy (BLE) beacons in shopping malls",
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
          jobTitle={"Game Developer, Intern"}
          startDate={"06/2015"}
          endDate={"09/2015"}
          items={[
            <span>
              Designed and implemented four 2D & 3D hypercasual games (Color
              Rush, Paper Dreams, Car Crossing, Tap to Aim) using open-source
              assets, and creating new models from scratch in Unity3D
            </span>,
            <span>
              Built and monetized the gamification infrastructure for{" "}
              <a
                href="https://apkpure.com/peak-box-game-arcade-machine/net.peakgames.peakbox.android"
                target="_blank"
                rel="noopener noreferrer"
                className={"colorHighlight"}
              >
                Peak Box
              </a>{" "}
              with interstitial video ads
            </span>,
            <span>
              Added localization support and multiple translations to Peak Box
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
          jobTitle={"Software Engineer, Intern"}
          startDate={"06/2014"}
          endDate={"07/2014"}
          items={[
            <span>
              Interned at the Financial Transaction Applications department and
              developed a CRUD report portal integrated with Microsoft Reporting
              Services (SSRS) for an international bank using ASP.NET MVC 5
            </span>,
            <span>
              Automated report generation for 30+ report types using Perl
              scripts and ASP.NET Razor (C# and HTML)
            </span>,
          ]}
        />
      </div>
    );
  }
}

export default Experience;

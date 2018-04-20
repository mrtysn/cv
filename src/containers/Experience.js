import React from 'react';
import CVSectionTitle from "../components/SectionTitle";
import SectionItem from "../components/SectionItem";
import {Divider} from "semantic-ui-react";

class Experience extends React.Component {

    render() {
        return (
            <div>
                <CVSectionTitle title={'EXPERIENCE'}/>
                <SectionItem
                    companyTitle={
                        <a href="https://appliedai.com" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            appliedAI
                        </a>
                    }
                    location={"İstanbul, Turkey"}
                    jobTitle={"CTO"}
                    startDate={"06/2017"}
                    endDate={"01/2018"}
                    items={[
                        "Grew the B2B data analytics and artificial intelligence solution platform appliedAI to 2700+ active users monthly",
                        "Curated a niche database of 3000+ AI companies, their application areas and their customer references via web crawling and organic user acquisition",
                        <span>Maintained the full stack of <a href="https://appliedai.com" target="_blank"
                                                            rel="noopener noreferrer">appliedAI.com
                        </a> with ReactJS, MobX, Django REST Framework, and PostgreSQL. Deployment with zero downtime using Heroku</span>,
                        "Provided mechanisms for lead generation and lead nurturing",
                        "Mentored junior developers on front-end development and web crawling",
                        "Coordinated core product development between the core team, interns, and freelance developers",
                        <span>Talked about "Quantifiable AI" at the online AI conference <a
                            href="http://ai.withthebest.com" target="_blank"
                            rel="noopener noreferrer">AI With The Best</a></span>,
                    ]}
                />
                <SectionItem
                    companyTitle={
                        <a href="http://www.kns.com.tr/en" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            KNS Information Technologies
                        </a>
                    }
                    location={"İstanbul, Turkey"}
                    jobTitle={"Freelance Android Developer"}
                    startDate={"03/2014"}
                    endDate={"07/2017"}
                    items={[
                        "Wrote 12+ applications for shopping malls. CMS support for promoting mall events and campaigns, sending push notifications, managing brand loyalty programs",
                        "Indoor navigation suggestions within shopping malls using Bluetooth low energy beacons",
                    ]}
                />
                <SectionItem
                    companyTitle={
                        <a href="https://twitter.com/ingorangelab" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            ING Bank - OrangeLab
                        </a>
                    }
                    location={"İstanbul, Turkey"}
                    jobTitle={"Machine Learning Consultant"}
                    startDate={"12/2016"}
                    endDate={"01/2017"}
                    description={
                        <span>
                            Project roadmap planning of ML problems.
                            Worked with data warehouse team and prepared training data for each project.
                            Worked with analytics team and structured the base models
                        </span>
                    }
                    items={[
                        "Predictive maintenance of automated teller machines",
                        "Credit limit prediction of potential customers and credit limit management of current customers",
                        "Net promoter score (NPS) prediction of customers"
                    ]}
                />
                <Divider hidden/>
                <SectionItem
                    companyTitle={
                        <a href="https://peak.games/" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            Peak Games
                        </a>
                    }
                    location={"İstanbul, Turkey"}
                    jobTitle={"Software Engineering Intern"}
                    startDate={"06/2015"}
                    endDate={"09/2015"}
                    items={[
                        "Created four games using Unity3D: Color Rush, Paper Dreams, Car Crossing, Tap to Aim. Both used open-source assets and designed new prefabs from scratch",
                        'Implemented a gamification infrastructure for Peak Box, monetized it with interstitial video advertisements',
                        'Added internationalization and localization support to Peak Box',
                    ]}
                />
                <SectionItem
                    companyTitle={
                        <a href="http://www.innova.com.tr/en/" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            Innova IT Solutions
                        </a>
                    }
                    location={"İstanbul, Turkey"}
                    jobTitle={"Software Engineering Intern"}
                    startDate={"06/2014"}
                    endDate={"07/2014"}
                    items={[
                        "Developed a CRUD Report Portal for an international bank using ASP.NET MVC 5",
                        "Wrote Perl scripts to automatically generate C# Razor HTML documents for 30+ different report types",
                    ]}
                />
            </div>
        );
    }
}

export default Experience;
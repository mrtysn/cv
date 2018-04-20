import React from 'react';
import CVSectionTitle from "../components/SectionTitle";
import SectionItem from "../components/SectionItem";

class Education extends React.Component {

    render() {
        return (
            <div>
                <CVSectionTitle title={'EDUCATION'}/>
                <SectionItem
                    companyTitle={
                        <a href="http://www.boun.edu.tr/" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            Boğaziçi University
                        </a>
                    }
                    location={"İstanbul, Turkey"}
                    jobTitle={"Master of Science, Computer Engineering - Incomplete"}
                    startDate={"2016"}
                    endDate={<strike>2019</strike>}
                    items={[
                        <span style={{fontSize: '14px'}}>
                            Student assistant of <a href="https://www.cmpe.boun.edu.tr/courses/cmpe300" target="_blank" rel="noopener noreferrer">
                                CmpE 300 Analysis of Algorithms
                            </a>. Prepared and graded homework questions.
                        </span>,
                        <span style={{fontSize: '14px'}}>
                            Co-founded the reading group <a href="https://deepboun.github.io/" target="_blank"
                                                            rel="noopener noreferrer">
                            deep-learning@boun</a>.
                        </span>,
                        <span style={{fontSize: '14px'}}>
                            Invited speaker at the event <a
                            href="https://www.eventbrite.com/e/garaj-ama-machinelearning-tickets-30715371503"
                            target="_blank" rel="noopener noreferrer">Ask Me Anything #machinelearning</a>.
                        </span>,
                        <span style={{fontSize: '14px'}}>
                            Invited speaker at the panel <a
                            href="https://www.facebook.com/events/1853350238248699/"
                            target="_blank" rel="noopener noreferrer">Learning to Learn</a>.
                        </span>,
                    ]}
                />
                <SectionItem
                    companyTitle={
                        <a href="https://www.cvut.cz/en" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            Czech Technical University
                        </a>
                    }
                    location={"Prague, Czech Republic"}
                    jobTitle={
                        <a href="http://cmp.felk.cvut.cz/summerschool2016/" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            Vision and Sports Summer School (VS3) 2016
                        </a>
                    }
                    endDate={"08/2016"}
                    items={[
                        <span style={{fontSize: '14px'}}>
                            State-of-the-art computer vision applications and recently published conference papers
                        </span>,
                    ]}
                />
                <SectionItem
                    companyTitle={
                        <a href="http://www.boun.edu.tr/" target="_blank" rel="noopener noreferrer"
                           style={{color: "rgba(0,0,0,.87)"}}>
                            Boğaziçi University
                        </a>
                    }
                    location={"İstanbul, Turkey"}
                    jobTitle={"Bachelor of Science, Computer Engineering"}
                    startDate={"2012"}
                    endDate={"2016"}
                    items={[
                        <span style={{fontSize: '14px'}}>
                            Honors: Dean’s Honor List; GPA: 3.28 / 4.00
                        </span>,
                        <span style={{fontSize: '14px'}}>
                            <a href="https://github.com/mrtysn/lstm" target="_blank" rel="noopener noreferrer">
                                Bachelor Thesis</a>: Learning Sequences Using RNNs and LSTMs.
                            Deep poem generation similar to the style of a poet.
                            Step by step activation analysis of LSTM cells' gates.
                        </span>,
                        <span style={{fontSize: '14px'}}>
                            Ranked 1<sup>st</sup> in the operations round of the case study competition <a
                            href="https://www.facebook.com/pg/All-Rounder-798557960200525/photos/?tab=album&album_id=1030521643670821"
                            target="_blank" rel="noopener noreferrer">All-Rounder</a> (2016)
                        </span>,
                        <span style={{fontSize: '14px'}}>
                            Ranked 1<sup>st</sup> in Yıldız Technical University <a
                            href="https://ytukvk.org.tr/5-finans-ve-yazilim-gunleri/" target="_blank"
                            rel="noopener noreferrer">5. Finance and Software Days</a> Code Contest (2014)
                        </span>,
                    ]}
                />
            </div>
        );
    }
}

export default Education;
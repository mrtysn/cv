import React from 'react';
import CVSectionTitle from "../components/SectionTitle";
import {List} from "semantic-ui-react";

class Skills extends React.Component {

    render() {
        return (
            <div>
                <CVSectionTitle title={'SKILLS'}/>
                <List horizontal bulleted>
                    <List.Item style={{fontWeight: 700}}>Back-end</List.Item>
                    <List.Item>Django; Django REST Framework</List.Item>
                    <List.Item>NodeJS; Loopback</List.Item>
                    <List.Item>Java; Spring</List.Item>
                    <List.Item>ASP.NET MVC C#</List.Item>
                </List>
                <br/>
                <List horizontal bulleted>
                    <List.Item style={{fontWeight: 700}}>Data Science</List.Item>
                    <List.Item>Python; NumPy, pandas</List.Item>
                    <List.Item>TensorFlow</List.Item>
                    <List.Item>MATLAB</List.Item>
                    <List.Item>R</List.Item>
                    <List.Item>Prolog</List.Item>
                </List>
                <br/>
                <List horizontal bulleted>
                    <List.Item style={{fontWeight: 700}}>DevOps</List.Item>
                    <List.Item>AWS; EC2 RDS S3</List.Item>
                    <List.Item>Heroku</List.Item>
                    <List.Item>Redis</List.Item>
                    <List.Item>Memcached</List.Item>
                    <List.Item>PostgreSQL</List.Item>
                    <List.Item>MongoDB</List.Item>
                </List>
                <br/>
                <List horizontal bulleted>
                    <List.Item style={{fontWeight: 700}}>Front-end & Mobile</List.Item>
                    <List.Item>React</List.Item>
                    <List.Item>MobX</List.Item>
                    <List.Item>React Native</List.Item>
                    <List.Item>Android</List.Item>
                    <List.Item>Unity3D</List.Item>
                </List>
                <br/>
                <List horizontal bulleted>
                    <List.Item style={{fontWeight: 700}}>Others</List.Item>
                    <List.Item>Perl</List.Item>
                    <List.Item>LaTeX</List.Item>
                    <List.Item>Arch Linux</List.Item>
                </List>
            </div>
        );
    }
}

export default Skills;
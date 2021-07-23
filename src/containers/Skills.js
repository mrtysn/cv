import React from "react";
import { Grid } from "semantic-ui-react";
import SectionTitle from "../components/SectionTitle";
import { SkillRow } from "../components/SkillRow";

class Skills extends React.Component {
  render() {
    const titleColumnWidth = 3;
    const dataColumnWidth = 13;
    const className = "px12";
    return (
      <div>
        <SectionTitle title={"SKILLS"} />
        <Grid
          columns={2}
          style={{ marginTop: "10px", marginBottom: "10px" }}
          className={className}
        >
          <SkillRow
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title="data science"
            items={["Python", "TensorFlow/Keras", "MATLAB", "R"]}
          />
          <SkillRow
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title="mobile"
            items={[
              "Android; Java",
              "Unity3D; C#",
              "Godot; GDScript",
              "React Native; NativeBase, UI Kitten",
            ]}
          />
          <SkillRow
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title="front-end"
            items={[
              "React.js",
              "React Router",
              "Next.js",
              "MobX",
              "styled-components",
              "Tailwind CSS",
              "Chakra UI",
              "Semantic UI",
              "Three.js",
              "AngularJS",
              "Server Side Rendering",
              "PWA",
            ]}
          />
          <SkillRow
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title="back-end"
            items={[
              "Django; Django REST",
              "Java; Spring",
              "ASP.NET MVC C#",
              "Node.js",
              "Apache",
              "nginx",
              "Redis",
              "Memcached",
              "RabbitMQ",
              "PostgreSQL",
              "MySQL",
              "MongoDB",
            ]}
          />
          <SkillRow
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title="dev-ops"
            items={[
              "AWS; EC2, RDS, S3, Lambda, VPC",
              "Heroku",
              "Docker",
              "Jenkins",
              "Digital Ocean",
            ]}
          />
          <SkillRow
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title="game-dev"
            items={["Unity3D; C#", "Godot; GDScript"]}
          />
          <SkillRow
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title="others"
            items={["Prolog", "Perl", "LaTeX", "Arch Linux", "WSL 2", "Git"]}
          />
          <SkillRow
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title="languages"
            items={["Turkish", "English", "German", "Macedonian"]}
          />
        </Grid>
      </div>
    );
  }
}

export default Skills;

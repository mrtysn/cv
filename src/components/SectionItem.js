import React from 'react';
import {List} from "semantic-ui-react";

class SectionItem extends React.Component {

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div className='px20'>
                        <strong>{this.props.companyTitle}</strong>
                    </div>
                    <div className='px20'>
                        <strong>{this.props.location}</strong>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div className='px18'>
                        <em>{this.props.jobTitle}</em>
                    </div>
                    <div className='px18'>
                        {this.props.startDate
                            ? [
                                this.props.startDate,
                                " – "
                            ]
                            : null
                        }
                        {this.props.endDate || "Present"}
                    </div>
                </div>
                {this.props.description && <div>{this.props.description}</div>}
                {this.props.items
                    ? <List bulleted style={{paddingLeft: '2em', marginTop: '10px'}}>
                        {this.props.items.map((item, ix) => {
                            return <List.Item key={ix}>{item}</List.Item>
                        })}
                    </List>
                    : null
                }
            </div>
        );
    }
}

export default SectionItem;
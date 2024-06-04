//display individual activity items in a card format
import React from 'react';
import { Activity } from '../types';

interface ActivityCardProps {
    title: string;
    description: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, description }) => {
    return (
        <div className="activity-card">
            <h2>{title}</h2>
            <p>{description}</p>
            {/* Add more activity details as needed */}
        </div>
    );
};

export default ActivityCard;

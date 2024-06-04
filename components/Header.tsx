//header section of website, appears at top of each page 
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/"><div>Home</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/activities">
                        <div>Activities</div>
                        </Link>
                    </li>
                    {/* Add more navigation links as needed */}
                </ul>
            </nav>
            <div className="logo">
                <Link href="/">
                <div>ActiPlanner</div>
                </Link>
            </div>
        </header>
    );
};

export default Header;

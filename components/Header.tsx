//header section of website, appears at top of each page 
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/"><a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/activities">
                        <a>Activities</a>
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

//header section of website, appears at top of each page 
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/" passHref legacyBehavior><a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/activities" passHref legacyBehavior>
                        <a>Activities</a>
                        </Link>
                    </li>
                    {/* Add more navigation links as needed */}
                </ul>
            </nav>
            <div className="logo">
                <Link href="/" passHref legacyBehavior>
                <div>ActiPlanner</div>
                </Link>
            </div>
        </header>
    );
};

export default Header;

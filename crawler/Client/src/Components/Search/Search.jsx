import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
    const [value, setValue] = useState('');
    const [links, setLinks] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const[baseURL,setBaseURL] = useState(value)
    // const [visitedLinks,setVisitedLinks] = useState(new Set());

    const handleInputChange = (e) => {
        setValue(e.target.value);
        setBaseURL(e.target.value);
    };


    const CrawlButtonClicked = async () => {
        try {
            const response = await axios.post('http://localhost:5000/crawl', {
                url: value,
            });
            setLinks(response.data);
        } catch (error) {
            console.error('Error fetching the URL:', error);
        }
    };

    const extractBaseURL = (url) => {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}`;
    };

    const CrawlAgainClicked = async (index) => {
        let url = links[index];
        console.log(index);
        console.log(baseURL);
        console.log(url);
        // Adjust the URL based on different conditions

        if(url.startsWith('http')){
            setBaseURL(extractBaseURL(url));
        }
        else if (url.startsWith('/') && url.endsWith('/')) {
            url = `${baseURL}${url.slice(1, -1)}`;
        } else if (url.startsWith('/') && baseURL.endsWith('/')) {
            url = `${baseURL}${url.slice(1)}`;
        }else if (url.startsWith('/')) {
            url = `${baseURL}${url}`;
        }else if (url.endsWith('/')) {
            url = `${baseURL}${url.slice(0, -1)}`;
        }
        else url = url;
        setValue(url);
        setIsProcessing(true);
        console.log(url);
        try {
            const response = await axios.post('http://localhost:5000/crawl', {
                url: url,
            });
            setLinks(response.data);
        } catch (error) {
            console.error('Error fetching the URL:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <div className="search-container">
                <div className="crawler-title">
                    <img src="./web.png" alt="Web Crawler Icon" />
                    <h1 className="crawler-title-text">WEB CRAWLER</h1>
                </div>
                <div className="crawler-input">
                    <input
                        type="text"
                        className="link-input"
                        value={value}
                        placeholder="Paste your Link here..."
                        onChange={handleInputChange}
                    />
                    <button className="crawl-button" onClick={CrawlButtonClicked}>
                        Crawl my Website
                    </button>
                </div>
                <div className="links-container">
                    {
                        isProcessing ? 
                    (
                        <div className="loading">
                            <img src="./loading.png" alt="" className="loader-svg" />
                        </div>
                    ) : (
                        <ol>
                            {links
                            .filter((link) => link.startsWith('/') || link.startsWith('http'))
                                .map((link, index) => (
                                    <div key={index} className="link-container">
                                        <li className='link'>
                                            <a href={link} target="_blank" rel="noopener noreferrer">
                                                {link}
                                            </a>
                                        </li>
                                        <button
                                            className="crawl-again"
                                            onClick={() => CrawlAgainClicked(index)}
                                            disabled={isProcessing}
                                        >
                                            Crawl
                                        </button>
                                    </div>
                                ))
                                }
                        </ol>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;

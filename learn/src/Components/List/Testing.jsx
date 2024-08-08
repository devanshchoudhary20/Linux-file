import React from 'react';

const RawHtmlComponent = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

const App = () => {
  const safeHtml = `<p>This is some <strong>safe</strong> HTML content.</p>`;
  const unsafeHtml = `<script>alert('This is unsafe!');</script>`;

  return (
    <div>
      <h1>Dangerously Set Inner HTML Example</h1>
      <h2>Safe HTML</h2>
      <RawHtmlComponent htmlContent={safeHtml} />
      <h2>Unsafe HTML</h2>
      {/* Uncomment the line below to see the danger in action */}
      <RawHtmlComponent htmlContent={unsafeHtml} />
    </div>
  );
};

export default App;

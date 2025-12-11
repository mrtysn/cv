import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CV_VERSION } from "../constants";

const PdfDownloadButton = () => {
  const buttonRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Create 100-0-100 pattern: visible at top, disappear in middle, visible at bottom
      let newOpacity;
      if (scrollPercent <= 0.15) {
        // Top 15%: fade from 1 to 0
        newOpacity = 1 - (scrollPercent / 0.15);
      } else if (scrollPercent >= 0.85) {
        // Bottom 15%: fade from 0 to 1
        newOpacity = (scrollPercent - 0.85) / 0.15;
      } else {
        // Middle 70%: completely hidden
        newOpacity = 0;
      }
      
      setOpacity(Math.max(0, Math.min(1, newOpacity)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const downloadFromGitHubReleases = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/mrtysn/cv/releases');
      const releases = await response.json();
      
      if (!releases || releases.length === 0) {
        throw new Error('No releases found');
      }
      
      // Find the most recent release with a PDF asset
      for (const release of releases) {
        const pdfAsset = release.assets?.find(asset => 
          asset.name.includes('Mert_Yasin_CV') && asset.name.endsWith('.pdf')
        );
        
        if (pdfAsset) {
          console.log(`📥 Downloading PDF from GitHub Releases: ${pdfAsset.name}`);
          // Create download link and trigger download
          const link = document.createElement('a');
          link.href = pdfAsset.browser_download_url;
          link.download = pdfAsset.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return true;
        }
      }
      
      throw new Error('No PDF found in releases');
    } catch (error) {
      console.warn('GitHub Releases download failed:', error);
      return false;
    }
  };

  const generatePDFLocally = async () => {
    try {
      // Show development info
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Development fallback: Using image-based PDF generation');
        console.log('⚠️  Links will NOT work in this PDF');
        console.log('💡 For interactive PDF with working links, run: pnpm run generate-pdf');
        console.log('🚀 Or push to master - GitHub Actions will generate interactive PDF');
      }
      
      const element = document.querySelector(".ui.text.container");
      
      // Generate canvas from HTML
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      
      // A4 dimensions with margins
      const a4Width = 8.27; // A4 width in inches
      const margin = 0.5; // 0.5 inch margins
      const contentWidth = a4Width - (2 * margin);
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      const totalHeight = contentHeight + (2 * margin);
      
      // Create PDF with A4 width and dynamic height
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [a4Width, totalHeight]
      });

      pdf.addImage(imgData, "JPEG", margin, margin, contentWidth, contentHeight);
      pdf.save(`Mert_Yasin_CV_${CV_VERSION.replace(/\./g, '_')}.pdf`);
      
      console.log('📄 PDF generated locally (fallback mode)');
    } catch (error) {
      console.error("Local PDF generation failed:", error);
      alert('PDF generation failed. Please try again or contact support.');
    }
  };

  const downloadPDF = async () => {
    // Hide the button during processing
    if (buttonRef.current) {
      buttonRef.current.style.display = "none";
    }

    try {
      console.log('🔍 Attempting to download from GitHub Releases...');
      const success = await downloadFromGitHubReleases();
      
      if (!success) {
        console.log('⚠️  GitHub Releases unavailable, falling back to local generation...');
        await generatePDFLocally();
      }
    } finally {
      // Show the button again
      if (buttonRef.current) {
        buttonRef.current.style.display = "block";
      }
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={downloadPDF}
      className="hideFromPrint pdf-download-button"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "transparent",
        color: "#2185d0",
        borderRadius: "4px",
        padding: "10px 15px",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "12px",
        fontWeight: "bold",
        transition: "all 0.2s ease",
        opacity: opacity,
        lineHeight: "1.2",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#2185d0";
        e.target.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "#2185d0";
      }}
    >
      Download as PDF
    </button>
  );
};

export default PdfDownloadButton;

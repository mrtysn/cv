import React, { useRef } from "react";
import { CV_VERSION } from "../constants";

// Positioning and the scroll fade belong to ControlStrip; this is only the button.
const PdfDownloadButton = () => {
  const buttonRef = useRef(null);

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

  // jsPDF and html2canvas are imported here rather than at the top of the file
  // because they are 68% of the main bundle and this is the fallback path: it
  // runs only when the GitHub Releases fetch fails, and the PDF it produces is
  // a rasterised image with no working links. Loading them lazily means the
  // ordinary visitor, who never reaches this function, does not download them.
  const generatePDFLocally = async () => {
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

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
    // Hide the button during processing so the local html2canvas fallback does
    // not paint it into the PDF. `visibility` rather than `display` so the
    // strip beside it does not reflow while the capture runs.
    if (buttonRef.current) {
      buttonRef.current.style.visibility = "hidden";
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
        buttonRef.current.style.visibility = "visible";
      }
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={downloadPDF}
      className="stripButton pdf-download-button"
      title="Download the CV as a PDF"
    >
      <span className="stripFull">Download as PDF</span>
      <span className="stripShort">PDF</span>
    </button>
  );
};

export default PdfDownloadButton;

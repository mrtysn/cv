import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PdfDownloadButton = () => {
  const buttonRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 300);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const downloadPDF = async () => {
    // Hide the button before generating PDF
    if (buttonRef.current) {
      buttonRef.current.style.display = "none";
    }

    try {
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
      pdf.save("CV.pdf");

    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Show the button again after PDF is generated
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
        border: "1px solid #2185d0",
        borderRadius: "4px",
        padding: "10px 15px",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "12px",
        fontWeight: "bold",
        transition: "all 0.2s ease",
        opacity: opacity,
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

// import html2canvas from 'html2canvas';
// import jsPdf from 'jspdf';
// import { useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faDownload} from '@fortawesome/free-solid-svg-icons';
// function Downloads() {
//     // const downloadPDF = ()=>{
//     //     const input = pdfRef.current;
//     //     html2canvas(input).then((canvas)=>{
//     //     const imgData = canvas.toDataURL('image/png');
//     //     const pdf = new jsPdf('p','mm','a4',true);
//     //     const pdfWidth = pdf.internal.pageSize.getWidth();
//     //     const pdfHeight = pdf.internal.pageSize.getHeight();
//     //     const imgWidth = canvas.width;
//     //     const imgHeight = canvas.height;
//     //     const ratio = Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
//     //     const imgX = (pdfWidth-imgWidth*ratio)/2;
//     //     const imgY = 30;
//     //     pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
//     //     pdf.save('invoice.pdf');
//     //     });
//     // };

//       const cardRef = useRef(null);
    
//       const handleDownload = async () => {
//         const cardElement = cardRef.current;
//         const canvas = await html2canvas(cardElement, { scale: 2 });
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPdf('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('card.pdf');
//       };
//   return (
//     <>
//       <div ref={cardRef}>
        
//       </div>
//       <button className='rounded-full ...' onClick={handleDownload}><FontAwesomeIcon icon={faDownload} /></button>

//     </>
//   )
// }

// export default Downloads
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function Downloads({ cardRef }) {
  const handleDownload = async () => {
    if (!cardRef.current) return;

    const cardElement = cardRef.current;
    const canvas = await html2canvas(cardElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPdf('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('card.pdf');
  };

  return (
    <button
      className='rounded-full ...'
      onClick={handleDownload}
    >
      <FontAwesomeIcon icon={faDownload} />
    </button>
  );
}

export default Downloads;
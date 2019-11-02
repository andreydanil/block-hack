import React from 'react';
import * as jsPDF from 'jspdf'
import image from './bgstring';

class Flyer extends React.Component{
    async componentDidMount(){
        let flyerDetails = JSON.parse(localStorage.getItem("flyerDetails"));
        let qrImage = await localStorage.getItem('qrImage');
        var imgData = image.uri;
        var doc = new jsPDF()
        let leftMargin = 85;
        let rightFold = 120;
        doc.addImage(imgData, 'JPEG', 0, 0, 210,300)
        //sign
        doc.setFont('helvetica')
        doc.setFontType('bold')
        doc.setFontSize(14)
        doc.setTextColor(255, 255, 255)
        doc.text(17, 15, flyerDetails.streetNumber.toUpperCase())
        doc.text(55, 30, flyerDetails.streetName.toUpperCase().substring(0,11))
        //block name
        doc.setFontSize(36)
        doc.setTextColor(25)
        doc.text(leftMargin, 56, flyerDetails.blockName)
        //block Mission
        doc.setFontSize(12)
        doc.setTextColor(70)
        var wrapText = doc.splitTextToSize(flyerDetails.missionStatement, rightFold, {});
        doc.text(leftMargin, 65, wrapText)
        //AS Title
        doc.setFontSize(24)
        doc.setTextColor(25)
        wrapText = doc.splitTextToSize('Our Block Aspirations', rightFold, {});
        doc.text(leftMargin, 100, wrapText)
        //Block Aspirations
        doc.setFontSize(12)
        doc.setTextColor(70)
        let asp = flyerDetails.aspirations;
        for(let i = 0; i < asp.length; i++){
            wrapText = doc.splitTextToSize(asp[i], rightFold, {});
            doc.text(leftMargin+10, 110 + i*5, wrapText);
        }
        //Organizer Info
        doc.setFontSize(24)
        doc.setTextColor(25)
        wrapText = doc.splitTextToSize('Organizer Information', rightFold, {});
        doc.text(10, 200, wrapText)
        //Organizer Info 2
        doc.setFontSize(12)
        doc.setTextColor(70)
        wrapText = doc.splitTextToSize(`Organizer Name: ${flyerDetails.orgName}`, rightFold, {});
        doc.text(10, 210, wrapText)
        wrapText = doc.splitTextToSize(`Organizer Phone: ${flyerDetails.orgPhone}`, rightFold, {});
        doc.text(10, 218, wrapText)
        wrapText = doc.splitTextToSize(`Organizer Email: ${flyerDetails.orgEmail}`, rightFold, {});
        doc.text(10, 226, wrapText)
        //user image
        doc.addImage(image.userImage, 'JPEG', 10, 110, 70,70);
        if(qrImage){
            doc.setFontSize(14)
            doc.setTextColor(25)
            doc.text(leftMargin+40, 197, "Join Our Block Facebook Group!")
            doc.addImage(qrImage, 'JPEG', rightFold+20, 203, 50,50);
        }
        //output
        if(window.innerWidth < 600){
            doc.output('dataurlnewwindow');
            return;
        }
        let iframe = document.getElementById("flyer");
        iframe.src = doc.output('datauristring');
    }
    render(){
        return(
            <div style={{height:window.innerHeight-120}}>
                <iframe 
                className="flyer"
                id="flyer"/>
            </div>
        )
    }
}

export default Flyer;
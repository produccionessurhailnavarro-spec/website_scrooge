from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
path='public/informacion-escuelas.pdf'
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='Main',fontName='Times-Roman',fontSize=33,leading=36,textColor=colors.HexColor('#35151e'),spaceAfter=8))
styles.add(ParagraphStyle(name='Copy',fontName='Helvetica',fontSize=10,leading=15,spaceAfter=13,textColor=colors.HexColor('#493b36')))
styles.add(ParagraphStyle(name='Label',fontName='Helvetica-Bold',fontSize=10,leading=15,spaceAfter=9,textColor=colors.HexColor('#84663c')))
story=[]
def p(text,style='Copy'):story.append(Paragraph(text,styles[style]))
p('PRODUCCIONES SURHAIL NAVARRO · PUERTO RICO','Label')
p('Scrooge','Main')
p('Un cuento de Navidad','Heading2')
p('Información para escuelas','Label')
p('Un clásico de Dickens, una inesperada inteligencia artificial y una oportunidad para volver a empezar. José Brocco y Sarianne Acosta protagonizan esta adaptación contemporánea de Surhail Navarro.')
p('La historia','Label')
p('Para Ebenezer Scrooge, el tiempo es dinero y la Navidad una pérdida de productividad. Su empleada Robin Cratchit presenta un sistema de inteligencia artificial creado a partir de los archivos de Jacob Marley. Scrooge deberá enfrentarse a su pasado, su presente y su posible futuro.')
p('Una experiencia para aprender y conversar','Label')
p('Música, comedia, proyecciones y efectos escénicos acompañan una historia sobre la empatía, la generosidad y las segundas oportunidades. La obra invita a explorar la responsabilidad, el respeto, el manejo de las emociones, la familia, el perdón y el uso responsable de la tecnología, conectando la literatura con las artes escénicas.')
p('Funciones escolares','Label')
rows=[[Paragraph('Teatro El Sol · San Germán',styles['Label']),Paragraph('Teatro Balboa · Mayagüez',styles['Label'])],[Paragraph('2 y 3 de diciembre de 2026<br/>Funciones escolares<br/>$20 por estudiante · IVU incluido<br/><br/>Un boleto de cortesía para el maestro por cada 20 estudiantes. Consulta horario y disponibilidad al reservar.',styles['Copy']),Paragraph('9 y 10 de diciembre de 2026<br/>9:00 a. m.<br/>$20 por estudiante · IVU incluido<br/><br/>Un boleto de cortesía para el maestro por cada 20 estudiantes.',styles['Copy'])]]
t=Table(rows,colWidths=[246,246]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#f5f0e7')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),13),('RIGHTPADDING',(0,0),(-1,-1),13),('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),9)]));story.append(t);story.append(Spacer(1,18))
p('Coordina tu visita escolar','Label')
p('939-207-1580<br/>producciones.surhailnavarro@gmail.com<br/>Para grupos, acompañantes y necesidades de accesibilidad, consulta los detalles al realizar tu reservación.')
p('Una producción de Producciones Surhail Navarro &amp; Producciones AJI Corp.')
SimpleDocTemplate(path,pagesize=(612,792),rightMargin=60,leftMargin=60,topMargin=45,bottomMargin=40).build(story)

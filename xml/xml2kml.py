import xml.etree.ElementTree as ET

def kmlGen(archivoXML):
    try:
        arbol = ET.parse(archivoXML)
        
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()
        
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
       
    root = arbol.getroot()
    
    i = 0
    for route in root.findall('.//ruta'):
        i += 1
        routeName = route.attrib["nombre"]
        routeKml = f"""<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
        <Placemark>
            <name>{routeName}</name>
            <LineString>
                <extrude>1</extrude>
                <tessellate>1</tessellate>
                <coordinates>
"""
        coordsInicio = route.find('./coordenadas')
        routeKml += f"\t\t\t\t\t{coordsInicio.attrib['longitud']},{coordsInicio.attrib['latitud']},{coordsInicio.attrib['altitud']}\n" 
        
        for coordsInHito in route.findall('.//hito/coordenadas'):
            routeKml += f"\t\t\t\t\t{coordsInHito.attrib['longitud']},{coordsInHito.attrib['latitud']},{coordsInHito.attrib['altitud']}\n" 
                
        routeKml += """\t\t\t\t</coordinates>
                <altitudeMode>relativeToGround</altitudeMode>
            </LineString>
            <Style id='lineaRoja'>
                <LineStyle>
                    <color>#ff0000ff</color>
                    <width>5</width>
                </LineStyle>
            </Style>
        </Placemark>
    </Document>
</kml>"""
        saveRoute(routeKml, f"ruta{i}.kml")
    
def saveRoute(kml, path):
    f = open(path, "w")
    f.write(kml)
    f.close()

def main():
    kmlGen("rutasEsquema.xml")

if __name__ == "__main__":
    main()    

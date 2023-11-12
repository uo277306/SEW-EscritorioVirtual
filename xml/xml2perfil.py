import xml.etree.ElementTree as ET
import math

def svgGen(archivoXML):
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
    distanceAccumulator = 0
    for route in root.findall('.//ruta'):
        i += 1
        routeName = route.attrib["nombre"]
        routeSvg = f"""<?xml version="1.0" encoding="UTF-8" ?>
<svg xmlns="http://www.w3.org/2000/svg" version="2.0">
    <polyline points=\""""
        # sacar las coordenadas de altitud convertidas a coordenadas de svg
        # La x es la acumulación de hito[distancia-hito-anterior]
        # la y al ser de arriba abajo habrá que cambiarla, pero para empezar que sea simplemente hito/coordenadas[altura]
        coordsInicio = route.find('./coordenadas')
        
        routeSvg += f"0,{float(coordsInicio.attrib['altitud'])/10}" 
        
        for hito in route.findall('.//hito'):
            coordsInHito = hito.find('./coordenadas')
            distanceAccumulator += 10
            routeSvg += f" {distanceAccumulator},{float(coordsInHito.attrib['altitud'])/10}" 
            
        routeSvg += f" {distanceAccumulator + 10},{float(coordsInicio.attrib['altitud'])/10}" 
        routeSvg += f" 0,{float(coordsInicio.attrib['altitud'])/10}" 
                
        routeSvg += """\"\n\t\tstyle="fill:black;stroke:red;stroke-width:4" />"""
        
        
        routeSvg += "\n</svg>"
        saveRoute(routeSvg, f"ruta{i}.svg")
    
def saveRoute(kml, path):
    f = open(path, "w")
    f.write(kml)
    f.close()

def main():    
    svgGen("rutasEsquema.xml")

if __name__ == "__main__":
    main()    

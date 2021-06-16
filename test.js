const {Builder, By, until, Key, WebElement } = require('selenium-webdriver');
const {expect} = require('chai');

describe('WebDriverTest', () => {

    let driver;

    before(async function() {
        driver = new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
        });

        it('Buscar una palabra en google y hacer links en el tercer resultado no patrocinado', async () => {

            //Carga la pagina www.google.com
            await driver.get('https://www.google.com');
            //Hace una pausa de 1 seg
            await driver.sleep(1000);
            //Escriba en el input de busqueda la palabra "iot"
            await driver.findElement(By.name('q')).sendKeys('iot',Key.ENTER);

            //Busca todos los elementos que pertenecen a la clase donde estan los links buscados
            //los links patrocinados pertencen a otra clase
            let elements = await driver.findElements(By.xpath("//div[@class='tF2Cxc']/div[@class='yuRUbf']"));

            let j = 0;
            let posBuscada = 0;
            let urlBuscada;// = "";
            //Recorre la lista de elementos encontrados
            for(let i= 0; i < elements.length; i++)
            {   
                //De cada elemento obtiene el texto dado que existen elementos que estan vacios
                let text = await elements[i].getText();
                if (text != ""){
                    //Acumula solo los elementos que tienen texto
                    j++;
                    //El tercer link buscado  
                    if (j == 3){
                        //Alamacena la posicion en la lista del tercer link
                        posBuscada = i;  
                    }
                }
            }

            //Se controla que se haya encontrado el link buscado
            expect(posBuscada).greaterThanOrEqual(0);         

            //Hace click en el link y entra a la pagina buscada
            await elements[posBuscada].click();

            //Hace una pausa de 2 segundos para ver el resultado
            await driver.sleep(2000);
           
        });

    after(async () => driver.quit());
});

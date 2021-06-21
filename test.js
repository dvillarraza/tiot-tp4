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
 
            //Escriba en el input de busqueda la palabra "iot"
            await driver.findElement(By.name('q')).sendKeys('tissot',Key.ENTER);
 
            //Busca todos los elementos que pertenecen a la clase donde estan los links buscados
            //los links patrocinados pertencen a otra clase
             let elements = await driver.findElements(By.xpath("//div[@class='tF2Cxc']/div[@class='yuRUbf']"));
 
            //Se controla que se haya encontrado el link buscado
            expect(elements.length).greaterThanOrEqual(3);         

            //Hace click en el link y entra a la pagina buscada
            await elements[2].click();

            //Hace una pausa de 2 segundos para abrir la pagina
            await driver.sleep(2000);

            //Obtengo el titulo de la nueva pagina
            let title = await driver.getTitle(); 

            //Se controla que el titulo contenga la palabra buscada como control de que se haya echo click
            expect(title).to.contain("Tissot");

            //Hace una pausa de 2 segundos para ver el resultado
            await driver.sleep(2000);
           
        });

    after(async () => driver.quit());
});

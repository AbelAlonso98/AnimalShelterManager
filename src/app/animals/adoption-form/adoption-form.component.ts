import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adopter } from 'src/app/models/adopter';
import { Animal } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';
import { AdoptersService } from 'src/app/services/adopters.service';

import * as pdfMake from 'pdfmake/build/pdfMake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent {
  formulario: FormGroup;
  animalID: string = "";
  animal: Animal = {
    name: "",
    species: "",
    chip_number: "",
    id: "",
    kennel: '',
    birth_date: new Date(),
    entry_date: new Date(),
    passport: '',
    neutered: false,
    ppp: false
  }
  adopter: Adopter = {
    name: "", surname: "", nif: "",
    phone: '',
    email: '',
    address: '',
    zip: '',
    city: '',
    state: ''
  }

  constructor(private animalsService: AnimalsService, private adoptersService: AdoptersService, private router: Router, private route: ActivatedRoute) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      nif: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      zip: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.animalID = params["id"];
      }
    );

    if (this.animalID != undefined) {
      this.animalsService.getAnimal(this.animalID).then((animalData: Animal) => {
        this.animal = animalData;
        this.animal.id = this.animalID;

      }).catch(error => {
        this.router.navigate(['/animals']);
      })

    }
  }

  async onSubmit() {
    this.adopter = this.formulario.value;
    this.generatePDFAdoptionContract(this.adopter)
    // console.log(this.adopter)
    // await this.adoptersService.addAdopter(this.adopter)
    // await this.adoptersService.addAdoption(this.adopter, this.animal)
    // await this.animalsService.deleteAnimal(this.animal)
    // this.router.navigate(['/animals']);

  }

  todayDateFormated() {
    const today = new Date();
    const formattedDate = `${today.getDate()} de ${this.getMonthName(today.getMonth())} de ${today.getFullYear()}`;
    return formattedDate
  }

  getMonthName(month: number) {
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return monthNames[month];
  }

  generatePDFAdoptionContract(adopter: Adopter) {


    const docDefinition: any = {
      content: [
        { text: 'CONTRATO DE ADOPCIÓN DE ANIMAL DE COMPAÑÍA', style: 'header', alignment: 'center' },
        { text: `REUNIDAS LAS PARTES en LUGARDELALBERGUE, a ${this.todayDateFormated()}`, margin: [0, 20, 0, 10] },
        { text: 'DE UNA PARTE, EL ADOPTANTE:', margin: [0, 10, 0, 10] },
        { text: `${adopter.name.toUpperCase()} ${adopter.surname.toUpperCase()}, mayor de edad, con DNI ${adopter.nif.toUpperCase()}, teléfono móvil ${adopter.phone}, correo electrónico ${adopter.email} y domicilio en ${adopter.address.toUpperCase()}, código postal ${adopter.zip.toUpperCase()}, localidad ${adopter.city.toUpperCase()}, provincia ${adopter.state.toUpperCase()}`, margin: [0, 10, 0, 10] },
        { text: 'Y DE OTRA PARTE:', margin: [0, 10, 0, 10] },
        { text: 'NOMBRE DEL RESPONSABLE. En representación de NOMBRE DEL ALBERGUE, CIF X-1234567', margin: [0, 10, 0, 10] },
        { text: `` },
        { text: 'En adelante, Adoptante y representante se reconocen capacidad para formalizar el presente documento y, de común acuerdo, fijan los términos del presente contrato de adopción del animal de compañía cuyas características se detallan a continuación:', margin: [0, 10, 0, 10] },
        {
          table: {
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              ['Name', 'Species', 'Nº chip', 'Nº pasaporte'],
              [this.animal.name, this.animal.species, this.animal.chip_number, this.animal.passport]
            ],
            
          },
          layout: 'lightHorizontalLines',
          margin: [0, 10, 0, 10]
        },
        { text: 'Cláusulas del contrato:', style: 'subheader' },
        {
          ol: [
            'El Adoptante velará por el cumplimiento y la observación de la legislación vigente local, regional y estatal en materia de protección animal, manteniendo al animal adoptado en las condiciones adecuadas para su bienestar físico, sanitario y emocional. Asimismo, el Adoptante declara que no pesa sobre él ninguna prohibición judicial o administrativa para la tenencia de animales.',
            'Todos los animales entregados en adopción por el representante son exclusivamente de compañía y para convivir con el Adoptante. Si se detectara que el animal adoptado está siendo utilizado para cualquier otro fin distinto al acordado, podrá ser retirado. Asimismo, el animal no será empleado para fines lucrativos o que vulneren los derechos del animal, quedando totalmente prohibida su utilización para peleas, cría, caza, guarda, explotación, exhibición, experimentación, vivisección o trabajo de cualquier tipo.',
            {
              text: 'Si el animal no estuviera esterilizado en el momento de su adopción, se ofrecen varias alternativas al Adoptante (se marcará con una X la opción elegida):',
              margin: [0, 10, 0, 10]
            },
            'Quedan prohibidas todo tipo de amputaciones y mutilaciones que obedezcan a razones estéticas y la cordectomía (corte de cuerdas vocales).',
            'El Adoptante declara que su situación económica le permite dar al animal adoptado una correcta alimentación e higiene, llevarlo al veterinario cuando sea necesario (además de un chequeo y vacunación anual como mínimo) y costear una guardería canina si durante un tiempo no pudiera ocuparse de él.',
            'El Adoptante declara que dispone de tiempo suficiente para pasear con el animal adoptado durante el tiempo necesario para satisfacer sus necesidades de ejercicio acorde a su naturaleza.',
            'El Adoptante declara que todas las personas con las que convive están de acuerdo con esta adopción y que dispone de autorización del propietario de la vivienda para tener un animal de compañía y no está sujeto a reglamentos o estatutos comunitarios que lo prohíban.',
            'En caso de incumplimiento de alguna de las obligaciones y claúsulas del presente contrato, el representante podrá requerir la devolución del animal adoptado, en cuyo caso el Adoptante entregará al animal voluntariamente y en las debidas condiciones físicas y psíquicas. Si el Adoptante se negara a devolver al animal, se hará cargo de cuantos gastos judiciales traigan a causa del incumplimiento del contrato de adopción. Asimismo, y en el caso de que el animal presentara daños causados directa o indirectamente por el Adoptante, éste asumirá los costes del tratamiento veterinario requerido.',
            'Desde el momento en que tiene lugar la firma de este contrato y la entrega del animal adoptado, el representante queda exonerado de toda responsabilidad civil y/o penal derivada de la custodia o tenencia del animal adoptado por parte del Adoptante.',
            'Las partes, para cualquier cuestión que surja entre ellas en relación al presente contrato, su ejecución, interpretación y/o cumplimiento, renunciando en lo menester a fuero propio, se someten expresamente a los Juzgados y Tribunales de la ciudad de Langreo.',
          ],
          margin: [0, 10, 0, 10]
        },
        { text: 'EL ADOPTANTE DECLARA:', style: 'subheader' },
        { text: 'Haber leído con detenimiento y entendido el contenido íntegro del presente contrato y estar conforme con él.', margin: [0, 10, 0, 10] },
        {
          columns: [
            {
              text: 'FIRMA Y SELLO ALBERGUE',
              alignment: 'center'
            },
            {
              text: 'FIRMA DEL ADOPTANTE',
              alignment: 'center'
            }
          ],
          margin: [0, 120, 0, 20]
        },
        { text: 'ANEXO', style: 'header', pageBreak: 'before' },
        { text: '1. ANIMALES POTENCIALMENTE PELIGROSOS:', style: 'subheader' },
        { text: 'En el supuesto de que el animal adoptado pertenezca a alguna de la razas relacionadas en el anexo I del Real Decreto 287/2002, de 22 de marzo, por el que se desarrolla la Ley 50/1999, de 23 de diciembre, sobre el régimen jurídico de la tenencia de animales potencialmente peligrosos, el Adoptante queda informado que debe estar en posesión de la correspondiente licencia administrativa así como del certificado de capacidad física y certificado de aptitud psicológica expedidos por un centro de reconocimiento debidamente autorizado.', margin: [0, 10, 0, 10] },
        { text: '2. PASAPORTE:', style: 'subheader' },
        { text: 'En este acto se hace entrega al Adoptante del pasaporte del animal adoptado debidamente cumplimentando con las vacunas recibida. Se entrega al animal desparasitado, con las últimas aplicaciones en la siguiente fecha :', margin: [0, 10, 0, 10] },
        { text: '3. LEGISLACIÓN:', style: 'subheader' },
        {
          ul: [
            'Ley Orgánica 1/2015, de 30 de marzo, por la que se modifica la Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal. (Art. 181 y 182)',
            'Ley 13/2002, de 23 de diciembre, de tenencia, protección y derechos de los animales.',
            'Decreto 99/2004, de 23 de diciembre, por el que se regula la identificación de los animales de compañía y el Registro informático centralizado del Principado de Asturias. (Art. 3)'
          ],
          margin: [0, 10, 0, 10]
        },
        { text: 'EL ADOPTANTE DECLARA:', style: 'subheader' },
        { text: 'Haber leído con detenimiento y entendido el contenido íntegro del presente anexo y estar conforme con él.', margin: [0, 10, 0, 10] },
        { text: 'FIRMA DEL ADOPTANTE:', margin: [0, 10, 0, 10] },
        { text: 'Nombre y apellidos del Adoptante', margin: [0, 10, 0, 10] },
        { text: 'De acuerdo con lo establecido por la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal (LOPD), le informamos que los datos aportados serán incorporados a un fichero del que es titular LA ARENA CLÍNICA VETERINARIA SL con la finalidad de realizar la gestión administrativa, contable y fiscal, así como enviarle comunicaciones comerciales sobre nuestros productos y/o servicios. Asimismo, le informamos de la posibilidad de ejercer los derechos de acceso, rectificación, cancelación y oposición de sus datos en el domicilio C/Ezcurdia 92 CP33202 - Gijón (Asturias) o enviando un e-mail a info@centroveterinariolaarena.com.', margin: [0, 10, 0, 10] },
        { text: 'Firmado:', margin: [0, 10, 0, 10] },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5]
        },
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }

}

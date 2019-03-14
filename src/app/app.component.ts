import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

class Info {
  public header: string;
  public description: string;
  public isOK: boolean;


  constructor(header: string, description: string, isOK: boolean) {
    this.header = header;
    this.description = description;
    this.isOK = isOK;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public form: FormGroup;
  public info: Info;

  constructor() {
    this.form = this.buildForm();
  }

  public onSubmit(): void {
    const values = this.form.value;
    const bmi = this.calculateBMI(values.weight, values.height);
    this.info = this.buildInfo(bmi);
  }

  private buildInfo(mbi: number): Info {
    if (mbi > 40) {
      return new Info('Nadháva III. stupně!', 'Mezi časté potíže zařazujeme dušnost, zvýšení tuku v krvi, onemocnění žlučníku a také cukrovku druhého stupně. Pacienti s extrémní obezitou si bohužel podstatně zkracují život. V průměru se nedožívají ani 60 let.', false);
    } else if (mbi > 35) {
      return new Info('Nadváha II. stupně!', 'S obezitou druhého stupně se pojí značné zdravotní potíže. V této kategorii najdeme všechna onemocnění, jako u obezity I. stupně, ale s vyšším rizikem. Přidávají se k nim vážnější onemocnění kloubů a to převážně kolen a kyčlí. Dále hypertenze, dna, koronární onemocnění a syndrom polycystických ovárií (u žen do třiceti let, nepřítomnost menstruace, neplodnost a ochlupení nezvyklých partií).', false);
    } else if (mbi > 30) {
      return new Info('Nadváha I. stupně!', 'Mezi nejčastější případy patří bolesti zad, kloubů a častá únava. Vyskytují se potíže s abnormální hodnotou pohlavních hormonů v těle. Méně časté jsou poruchy plodnosti nebo poškození plodu následkem obezity matky. Můžeme se setkat i s rakovinou. V této oblasti je to nejčastěji rakovina tlustého střeva a rakovina prsu u žen po menopauze.', false);
    } else if (mbi > 25) {
      return new Info('Nadváha', 'V první řadě se jedná o chronické onemocnění, které vyžaduje dlouhodobou léčbu. Velkým varováním může být výskyt obezity v rodině. V České republice bojuje s obezitou přibližně 40 % populace.', false);
    } else if (mbi > 18) {
      return new Info('Normální váha', 'Jsi v pohodě.', true);
    }

    return new Info('Podváha', 'Nadváha představuje v porovnání s obezitou nízké riziko výskytu onemocnění spojené se zvýšeným množstvím tělesného tuku. Nejčastěji je nadváha spojována se špatným metabolismem člověka a se změnou stravovacích návyků. Může se jednat o dočasný stav způsobený dlouhodobou stresovou situací, u zen po těhotenství. V horším případě může představovat počátek obezity.\n' +
      '\n' +
      'Nejvhodnějším řešením pro spalování tuků je pravidelné cvičení a sportovní činnost.', false);
  }

  private calculateBMI(weight: number, height: number): number {
    const meters = height / 100;
    return weight / (meters * meters);
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      weight: new FormControl(null, [Validators.required, Validators.min(1)]),
      height: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }
}

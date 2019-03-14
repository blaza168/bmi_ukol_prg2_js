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
      return new Info('Nadháva III. stupně!', 'Měl bys zhubnout.', false);
    } else if (mbi > 35) {
      return new Info('Nadváha II. stupně!', 'Měl bys zhubnout.', false);
    } else if (mbi > 30) {
      return new Info('Nadváha I. stupně!', 'Měl bys zhubnout.', false);
    } else if (mbi > 25) {
      return new Info('Nadváha', 'Měl bys zhubnout.', false);
    } else if (mbi > 18) {
      return new Info('Normální váha', 'Jsi v pohodě.', true);
    }

    return new Info('Podváha', 'Měl bys začít pořádně jíst.', false);
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

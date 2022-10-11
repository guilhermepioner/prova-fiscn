import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Register } from './models/registro.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  form!: FormGroup;
  registros: Register[] = [];
  dataSource: MatTableDataSource<Register> = new MatTableDataSource<Register>(this.registros);

  title = 'Prova Front - Fiscon'
  displayedColumns: string[] = ['id', 'name', 'phone', 'delete'];
  autoIncrement = 1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * Inicializando DataSource para a Table
   */
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.registros;
    this.dataSource.sort = this.sort;
  }

  /**
   * Adiciona Registros
   */
  submit() {
    this.registros.push({ id: this.autoIncrement++, ...this.form.value });
    this.save();
  }

  /**
   * Limpa Formulário
   */
  clear() {
    this.form.reset();
  }

  /**
   * Remove Registros
   * @param register Registro à ser excluído
   */
  remove(register: Register) {
    const index = this.registros.indexOf(register);

    if (index !== -1) {
      this.registros.splice(index, 1);
    }

    this.save();
  }

  /**
   * Salva alteração nos Registros
   */
  save() {
    this.dataSource.data = this.registros;
    this.clear();
  }
}

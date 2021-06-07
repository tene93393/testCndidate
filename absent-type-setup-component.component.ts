import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatBottomSheet } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { courtservice } from '../../services/court.service';
import { CojService } from 'src/app/shared/others/coj.service';
import { Observable } from 'rxjs';
import { SelectionListDialogComponent } from 'src/app/shared/components/selection-list-dialog/selection-list-dialog.component';
import { absenttypeservice } from '../../services';
import { AbsentTypeModel } from '../../models';
import { element } from 'protractor';
import { ConfirmBottomSheetComponent } from './../../../../shared/components/confirm-bottom-sheet/confirm-bottom-sheet.component';



@Component({
  selector: 'app-absent-type-setup-component',
  templateUrl: './absent-type-setup-component.component.html',
  styleUrls: ['./absent-type-setup-component.component.css'],
  providers: [absenttypeservice, courtservice]
})
export class AbsentTypeSetupComponentComponent implements OnInit {





  AbsentTypeModel: AbsentTypeModel = new AbsentTypeModel()
  courtcode: any
  courtname: any
  absentTypes = []
  id: any = 0
  //have to state 1-search and 2-transaction
  mode: string = "search"
  activeFlagMeaning:{[key:number]:string} = {
    [1]:"ใช้งาน",
    [0]:"ไม่ใช้งาน",
  }



  public AbsentTypeList: MatBottomSheet;
  public dataAbsentType: MatBottomSheet




  pageName = "ประเภทวันลาผู้พิพากษา"
  pageIcon = "ti-save"
  searchToggle = true


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [ 'Checkbox' , 'absentTypeCode', 'absentTypeName', 'selectCode', 'star'];
  ELEMENT_DATA: any[] = []
  dataSource: MatTableDataSource<any>
  selection = new SelectionModel<any>(false, []);
  /** Whether the number of selected elements matches the total number of rows. */
  activeFlagValue:string



  constructor(
    private absenttypeservice: absenttypeservice,
    private courtservice: courtservice,
    public dialog: MatDialog,
    public cojService: CojService,
    public bottomSheet: MatBottomSheet,

  ) { }

  ngOnInit() {

    console.log(' selection - : ', this.selection)
    console.log(this.AbsentTypeModel)
    this.absenttypeservice.getList().subscribe(res => {
      console.log(res)
      this.ELEMENT_DATA = res.data
      this.ELEMENT_DATA.forEach(element => {
        element.activeFlagMeaning = this.activeFlagMeaning[element.activeFlag]
      });
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
    })
  }

  refreshTable() {
    this.absenttypeservice.getList().subscribe(res => {
      this.ELEMENT_DATA = res.data
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
    })
  
  
  this.getactiveFlagMeaning
}


  
getactiveFlagMeaning(key:number){
this.activeFlagValue = this.activeFlagMeaning[key]
}



  save() {
    console.log('SaveAbsentTypeModel', this.AbsentTypeModel);
    this.absenttypeservice.post(this.AbsentTypeModel).subscribe(res => {
      this.AbsentTypeModel = res.data
        this.cojService.success()
      this.mode = "search"
      this.absenttypeservice.getList().subscribe(res => {
        console.log(res)
        this.ELEMENT_DATA = res.data
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
      })
    }, err => {
      this.cojService.error()
    })
  }



  // save(){
  //   console.log('SaveAbsentTypeModel',this.AbsentTypeModel);
  //   this.absenttypeservice.post(this.AbsentTypeModel).subscribe(res=>{
  //     this.AbsentTypeModel = res.data
  //       this.cojService.success()

  //   }, err => {
  //     this.cojService.error()
  //   })
  // }

   



  edit() {
    this.absenttypeservice.put(this.AbsentTypeModel).subscribe(res => {
      this.AbsentTypeModel = res.data
        this.cojService.success()

    }, err => {
      this.cojService.error()
    })


  }




  clear() {
    this.absenttypeservice.put(this.AbsentTypeModel).subscribe(res => {
      // this.id = res.data.id
      this.AbsentTypeModel = res.data
        this.cojService.success()

    }, err => {
      this.cojService.error()
    })
  }


  search() {
    this.mode == "search"
    console.log('SearchAbsentTypeModel', this.AbsentTypeModel);
    this.absenttypeservice.search(this.AbsentTypeModel).subscribe(res => {
      console.log('res.data : ', res.data)
      this.ELEMENT_DATA = res.data
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.cojService.success()

    }, err => {
      this.cojService.error()
    })
  }


  delete() {
    this.AbsentTypeModel = new AbsentTypeModel
    this.id = 0

  }

  editElementTable(element) {
    this.mode = "transaction"
    console.log(element)
    this.id = element.id;
    this.AbsentTypeModel = element

  }

  deleteElementTable(element) {
    let bts = this.bottomSheet.open(ConfirmBottomSheetComponent)
    bts.instance.content.header = "คุณต้องการลบข้อมูลนี้ใช่หรือไม่"
    bts.afterDismissed().subscribe(res => {
      if (res) {
        this.absenttypeservice.delete(element.id).subscribe(res => {
          this.AbsentTypeModel = res.data
            this.cojService.success()


          this.absenttypeservice.getList().subscribe(res => {
            console.log(res)
            this.ELEMENT_DATA = res.data
            this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
            this.dataSource.sort = this.sort
            this.dataSource.paginator = this.paginator;
          })
        }, err => {
          this.cojService.error()

        })
      }

    })

  }


  courtopen() {
    this.courtservice.get().subscribe(res => {
      this.selDialog('ศาล', res.data, ['courtCode', 'courtNameTh'], ['รหัส', 'ชื่อศาล']).subscribe(data => {
        if (data) {
          this.courtcode = data.courtCode
          this.courtname = data.courtNameTh
          this.AbsentTypeModel.courtId = data.id
        }
      })
    })
  }


  AbsentTypeopen() {
    this.absenttypeservice.getList().subscribe(res => {
      this.selDialog('ประเภทวันลา', res.data, ['absentTypeCode', 'absentTypeName'], ['รหัสแทนประเภทวันลา', 'ชื่อประเภทวันลา']).subscribe(data => {
        if (data) {
          this.AbsentTypeModel = data
        }
      })
    })
  }



  AbsentTypeFlagopen() {
    this.absenttypeservice.getList().subscribe(res => {
      this.selDialog('ชื่อย่อ', res.data, ['absentTypeFlag'], ['ชื่อย่อ']).subscribe(data => {
        if (data) {
          this.AbsentTypeModel = data
        }
      })
    })
  }



  selDialog(title: string, data: any[], columns: string[], headers: string[]): Observable<any> {
    let dl = this.dialog.open(SelectionListDialogComponent, { width: '600px' })
    let instance = dl.componentInstance
    instance.title = title
    instance.elementData = data
    instance.displayedColumns = columns
    instance.displayedHeaders = headers
    return dl.afterClosed()
  }

  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.dataSource) {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  changeToTranMode() {
    this.mode = "transaction"
  }

}


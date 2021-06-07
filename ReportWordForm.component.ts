import { Component, OnInit } from '@angular/core';
import { ReportWordService } from '../../../shared/services/ReportWord.Service';
import { ReportWordModel, bookmarkValueList, bookmarkModel } from '../../../shared/models/ReportWordFormModel.model';
import { ServiceLookup } from '../../wf/Service/ServiceLookup.Service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { StructureService } from '../../wf/Service';
import { UserprofileService } from '../../follow/Service';
import { UserService } from '../../material/service/user/user.service';

@Component({
  selector: 'app-ReportWordForm',
  templateUrl: './ReportWordForm.component.html',
  styleUrls: ['./ReportWordForm.component.css'],
  providers: [UserService,ReportWordService, ServiceLookup]
})
export class ReportWordFormComponent implements OnInit {
  pageIcon = "ti-printer"
  pagename = "รายงาน"
  pageDescription = "รายงาน"
  reportModel: ReportWordModel[] = []
  Lookup: any[] = []
  ModelName: any[] = []
  Ui: any = {}
  ModelAll: bookmarkValueList = new bookmarkValueList()
  FormId : number = 0
  

  
  constructor(

    private _route: ActivatedRoute,

    public ___ServiceReport: ReportWordService,
    public ___ServiceLookup: ServiceLookup,
    public __StructureService : UserService
  ) { }

  ngOnInit() {

    this._route.params
    .subscribe((params: Params) => {
      console.log('Param --- >',params['FormId'])
      this.FormId = params['FormId']
      // if (!isNaN(params['ReceiveId'])) {
      //   this.SendId = +params['SendId']
      // } else {
      //   this.SendId = 0
      // }

    })
    this.___ServiceReport.ListField(this.FormId).subscribe(Response => {
      this.reportModel = Response.data
      console.log('Report -- > _',this.reportModel)
      
      this.Service()
      this.model()
    })

  }

  Service() {
    let lookup: any[] = []
    this.reportModel.forEach(element => {
      if (element.reportTypeName == "dropdownlist") {
        lookup.push(this.___ServiceLookup.get(element.fieldlookup))
        this.ModelName.push(element.fieldlookup)
      }
    });
    forkJoin(lookup).subscribe((Response: any[]) => {
      console.log(Response)
      this.ModelName.forEach((element, index) => {
        this.Ui[element] = Response[index].data
      });
    })
  }

  model() {
    this.reportModel.forEach((element, index) => {
      this.ModelAll.bookmarkValueList.push(new bookmarkModel({bookmark:element.fieldModel})) 
    });
    
    JSON.parse(sessionStorage.getItem('BookMark')).bookmarkValueList.forEach(element => {
      this.ModelAll.bookmarkValueList.push(new bookmarkModel({bookmark:element.bookmark,data:element.data}))
      // this.ModelAll.bookmarkValueList.push(new bookmarkModel({data:element.data}))
    });
  }


  print() {
    // console.log("ModelAll : ",JSON.stringify(this.ModelAll))
    console.log(this.ModelAll)

    this.___ServiceReport.postReportWord(this.FormId, this.ModelAll).subscribe(Response => {
      console.log(Response)
      if(Response.data){
        window.open(Response.data);
        sessionStorage.removeItem('BookMark')
      }
    })

  }
}

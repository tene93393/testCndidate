import { Component, OnInit } from '@angular/core';
import { AlertSetupService } from '../../follow/Service/AlertSetupService.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  providers: [AlertSetupService]
})
export class DashBoardComponent implements OnInit {

  modules: any = [{             
    id: 1,
    name: 'title',
    detail: 'title',
    icon: 'scale',
    color: '#98518E',
    route: 'case',
  }, {
    id: 2,
    name: 'description',
    detail: 'description',
    icon: 'jail',
    color: '#985CA4',
    route: 'detention',
  },
  {
    id: 3,
    name: 'ระบบหมายจับหมายค้น',
    detail: 'บันทึกรายละเอียดการออกหมายจับ/หมายค้น ออกรายงานการขอหมายจับ/หมายค้น',
    icon: 'handcuffs',
    color: '#9468BA',
    route: 'warrant',
  },
  {
    id: 4,
    name: 'contact',
    detail: 'contact',
    icon: '015-handshake',
    color: '#8B76D0',
    route: 'mediation',
  }, {
    id: 5,
    name: 'information',
    detail: 'information',
    icon: 'box',
    color: '#7A84E6',
    route: 'dms',
  },
  {
    id: 6,
    name: 'created timestamp',
    detail: 'created timestamp',
    icon: 'user-bubble',
    color: '#DB7ED8',
    route: 'statement',
    menu: []
  },
  {
    id: 7,
    name: 'latest ticket update timestamp',
    detail: 'latest ticket update timestamp',
    icon: 'court',
    color: '#FF83B2',
    route: 'proceed',
    menu: []
  },
 
  ]

  constructor(

  ) { }

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../../../shared";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public  profileInformations : any;
  constructor(private profileService: ProfileService) {

  }

  ngOnInit() {
      this.getProfile();
  }

    getProfile(){
        this.profileService.profile().$observable.subscribe(profile => {
            this.profileInformations = profile;
        });
    }
}

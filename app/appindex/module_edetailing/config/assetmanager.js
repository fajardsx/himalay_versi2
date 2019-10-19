import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import PAGE_ID from './pagemanager';

import Cystone_page1_core from '../pages/cystone/cystone_page1';
import Cystone_page2_core from '../pages/cystone/cystone_page2';
import Cystone_page3_core from '../pages/cystone/cystone_page3';
import Cystone_page4_core from '../pages/cystone/cystone_page4';
import Cystone_page5_core from '../pages/cystone/cystone_page5';
import Cystone_page6_core from '../pages/cystone/cystone_page6';
import Cystone_page7_core from '../pages/cystone/cystone_page7';
import Cystone_page8_core from '../pages/cystone/cystone_page8';
import Tentex_Royal_page1_core from '../pages/tentexroyal/tentex_royal_page1';
import Tentex_Royal_page2_core from '../pages/tentexroyal/tentex_royal_page2';
import Kapikachhu_page1_core from '../pages/kapikachhu/kapikachhu_page1';
import Kapikachhu_page2_core from '../pages/kapikachhu/kapikachhu_page2';
import { callToast } from '../../../global/Global';
import Tripahala_page1_core from '../pages/triphala/tripahala_page1';
import Liv52DS_page1_core from '../pages/liv52ds/liv52ds_page1';
import Tentex_royal_page3_core from '../pages/tentexroyal/tentex_royal_page3';
import Liv52DS_page2_core from '../pages/liv52ds/liv52dsl_page2';
import Liv52DS_page3_core from '../pages/liv52ds/liv52dsl_page3';
import Liv52DS_page4_core from '../pages/liv52ds/liv52ds_page4';
import Ashvagandha_page1_core from '../pages/ashvagandha/ashvagandha_page1';
import Septilin_page1_core from '../pages/septilin/septilin_page1';
import Amalaki_page1_core from '../pages/amalaki/amalaki_page1';
import Tagara_page1_core from '../pages/tagara/tagara_page1';
import Shallaki_page1_core from '../pages/shallaki/shallaki_page1';
import Shatavari_page1_core from '../pages/shatavari/shatavari_page1';
import Gokshura_page1_core from '../pages/gokshura/gokshura_page1';
import Ashvagandha_page2_core from '../pages/ashvagandha/ashvagandha_page2';
import Ashvagandha_page3_core from '../pages/ashvagandha/ashvagandha_page3';
import Ashvagandha_page4_core from '../pages/ashvagandha/ashvagandha_page4';
import Ashvagandha_page5_core from '../pages/ashvagandha/ashvagandha_page5';
import Ashvagandha_page6_core from '../pages/ashvagandha/ashvagandha_page6';
import Gokshura_page2_core from '../pages/gokshura/gokshura_page2';
import Others_page1_core from '../pages/others/others_page1';
import Shatavari_page2_core from '../pages/shatavari/shatavari_page2';
import Cystone_page9_core from '../pages/cystone/cystone_page9';

export default class Assetmanager{

}
export function setPage(states,props,callshowpdf) {
    const { currentPage } = states;
    const { navigation} = props;
    //callToast("page "+currentPage);
    //CYSTONE
  if (currentPage == PAGE_ID.CRYSTONE_2_ID.id) {
        return (
            <Cystone_page2_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_CRYSTONE_UROLOGY}
                page_id={PAGE_ID.CRYSTONE_2_ID}
            />
        );
    }
  else if (currentPage == PAGE_ID.CRYSTONE_3_ID.id) {
        return (
            <Cystone_page3_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_CRYSTONE_UROLOGY}
                page_id={PAGE_ID.CRYSTONE_3_ID}
            />
        );
    }
  else if (currentPage == PAGE_ID.CRYSTONE_4_ID.id) {
        return (
            <Cystone_page4_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_CRYSTONE_UROLOGY}
                page_id={PAGE_ID.CRYSTONE_4_ID}
            />
        );
    }
  else if (currentPage == PAGE_ID.CRYSTONE_5_ID.id) {
        return (
            <Cystone_page5_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_CRYSTONE_UROLOGY}
                page_id={PAGE_ID.CRYSTONE_5_ID}
            />
        );
    }
  else if (currentPage == PAGE_ID.CRYSTONE_6_ID.id) {
        return (
            <Cystone_page6_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_CRYSTONE_UROLOGY}
                page_id={PAGE_ID.CRYSTONE_6_ID}
                showPdf={callshowpdf.bind(this)}
            />
        );
    }
  else if (currentPage == PAGE_ID.CRYSTONE_7_ID.id) {
        return (
            <Cystone_page7_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_CRYSTONE_UROLOGY}
                page_id={PAGE_ID.CRYSTONE_7_ID}
                showPdf={callshowpdf.bind(this)}
            />
        );
    }
  else if (currentPage == PAGE_ID.CRYSTONE_8_ID.id) {
        return (
            <Cystone_page8_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_CRYSTONE_UROLOGY}
                page_id={PAGE_ID.CRYSTONE_8_ID}
                showPdf={callshowpdf.bind(this)}
            />
        );
    }
  else if (currentPage == PAGE_ID.CRYSTONE_9_ID.id) {
        return (
            <Cystone_page9_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_CRYSTONE_UROLOGY}
                page_id={PAGE_ID.CRYSTONE_9_ID}
                showPdf={callshowpdf.bind(this)}
            />
        );
    }
  //TENTEX ROYAL
  else if (currentPage == PAGE_ID.Tentex_Royal_Urology_1_ID.id) {
        return (
            <Tentex_Royal_page1_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_TENTEX_ROYAL_UROLOGY}
                page_id={PAGE_ID.Tentex_Royal_Urology_1_ID}
            />
        );
    }
  else if (currentPage == PAGE_ID.Tentex_Royal_Urology_2_ID.id) {
        return (
            <Tentex_Royal_page2_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_TENTEX_ROYAL_UROLOGY}
                page_id={PAGE_ID.Tentex_Royal_Urology_2_ID}
                showPdf={callshowpdf.bind(this)}
            />
        );
    }
  
    //KAPIPACHUU
  else if (currentPage == PAGE_ID.Kapipachuu_1_ID.id) {
        return (
            <Kapikachhu_page1_core
                navigation={navigation}
                bab_id={PAGE_ID.TITLE_KAPIKACU_UROLOGY}
                page_id={PAGE_ID.Kapipachuu_1_ID}
                showPdf={callshowpdf.bind(this)}
            />
        );
    }
  
      //TRIPHALA
  else if (currentPage == PAGE_ID.Triphala_1_ID.id) {
        return (
            <Tripahala_page1_core
                navigation={navigation}
               // bab_id={PAGE_ID.}
                page_id={PAGE_ID.Triphala_1_ID}
                showPdf={callshowpdf.bind(this)}
            />
        );
    }
      //LIV 52 DS 
  else if (currentPage == PAGE_ID.Liv_52_DS_1_ID.id) {
      return (
          <Liv52DS_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Liv_52_DS_1_ID}
          //showPdf={callshowpdf.bind(this)}
          />
      );
  }
  else if (currentPage == PAGE_ID.Liv_52_DS_2_ID.id) {
      return (
          <Liv52DS_page2_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Liv_52_DS_2_ID}
          //showPdf={callshowpdf.bind(this)}
          />
      );
  } 
  else if (currentPage == PAGE_ID.Liv_52_DS_3_ID.id) {
      return (
          <Liv52DS_page3_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Liv_52_DS_3_ID}
          showPdf={callshowpdf.bind(this)}
          />
      );
  }
 
  //ASHVAGANDGHA
  else if (currentPage == PAGE_ID.Ashvagandha_1_ID.id) {
      return (
          <Ashvagandha_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Ashvagandha_1_ID}
          //showPdf={callshowpdf.bind(this)}
          />
      );
  }
  else if (currentPage == PAGE_ID.Ashvagandha_2_ID.id) {
      return (
          <Ashvagandha_page2_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Ashvagandha_2_ID}
          //showPdf={callshowpdf.bind(this)}
          />
      );
  } else if (currentPage == PAGE_ID.Ashvagandha_3_ID.id) {
      return (
          <Ashvagandha_page3_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Ashvagandha_3_ID}
            showPdf={callshowpdf.bind(this)}
          />
      );
  }
  else if (currentPage == PAGE_ID.Ashvagandha_4_ID.id) {
      return (
          <Ashvagandha_page4_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Ashvagandha_4_ID}
                showPdf={callshowpdf.bind(this)}
          />
      );
  }
  else if (currentPage == PAGE_ID.Ashvagandha_5_ID.id) {
      return (
          <Ashvagandha_page5_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Ashvagandha_5_ID}
          //showPdf={callshowpdf.bind(this)}
          />
      );
  }
  else if (currentPage == PAGE_ID.Ashvagandha_6_ID.id) {
      return (
          <Ashvagandha_page6_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Ashvagandha_6_ID}
            showPdf={callshowpdf.bind(this)}
          />
      );
  }
  //SEPTILIN
  else if (currentPage == PAGE_ID.Septilin_1_ID.id) {
      return (
          <Septilin_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Septilin_1_ID}
            showPdf={callshowpdf.bind(this)}
          />
      );
  }
  //AMALAKI
  else if (currentPage == PAGE_ID.Amalaki_1_ID.id) {
      return (
          <Amalaki_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Amalaki_1_ID}
              showPdf={callshowpdf.bind(this)}
          />
      );
  }
  //TAGARA
  else if (currentPage == PAGE_ID.Tagara_1_ID.id) {
      return (
          <Tagara_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Tagara_1_ID}
            showPdf={callshowpdf.bind(this)}
          />
      );
  }
  //SHALLAKI
  else if (currentPage == PAGE_ID.Shallaki_1_ID.id) {
      return (
          <Shallaki_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Shallaki_1_ID}
            showPdf={callshowpdf.bind(this)}
          />
      );
  }
  //SHATAVARI
  else if (currentPage == PAGE_ID.Shatavari_1_ID.id) {
      return (
          <Shatavari_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Shatavari_1_ID}
            showPdf={callshowpdf.bind(this)}
          />
      );
  }
 
  //GOKSHURA
  else if (currentPage == PAGE_ID.Gokshura_1_ID.id) {
      return (
          <Gokshura_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Gokshura_1_ID}
            showPdf={callshowpdf.bind(this)}
          />
      );
  }
 
  //OTHERS
  else if (currentPage == PAGE_ID.Others_1_ID.id) {
      return (
          <Others_page1_core
              navigation={navigation}
              // bab_id={PAGE_ID.}
              page_id={PAGE_ID.Others_1_ID}
              showPdf={callshowpdf.bind(this)}
          />
      );
  }
}


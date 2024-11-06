sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/odata/v4/ODataModel","sap/m/MessageToast","sap/ui/export/Spreadsheet"],function(e,t,a,r,o){"use strict";return e.extend("inventory.controller.InventoryDashboard",{onInit:function(){},onGoFilter:function(){var e=this.byId("inventoryDataTable");var t=e.getBinding("items");var a=[];var r=this.byId("materialReqNoFilter").getValue();var o=this.byId("categoryFilter").getSelectedKey();var i=this.byId("statusFilter").getSelectedKey();var l=this.byId("dateFilter").getDateValue();if(r){a.push(new sap.ui.model.Filter("reqNo",sap.ui.model.FilterOperator.EQ,r))}if(o){a.push(new sap.ui.model.Filter("Category",sap.ui.model.FilterOperator.EQ,o))}if(i){a.push(new sap.ui.model.Filter("Status",sap.ui.model.FilterOperator.EQ,i))}if(l){var s=new Date(l.setHours(0,0,0,0));var n=new Date(l.setHours(23,59,59,999));a.push(new sap.ui.model.Filter({path:"createdAt",operator:sap.ui.model.FilterOperator.BT,value1:s.toISOString(),value2:n.toISOString()}))}t.filter(a)},onRefresh:function(){var e=this.byId("inventoryDataTable");e.setBusy(true);this.byId("materialReqNoFilter").setValue("");this.byId("dateFilter").setDateValue(null);this.byId("categoryFilter").setSelectedKey("");this.byId("statusFilter").setSelectedKey("");var t=e.getBinding("items");t.filter([]);setTimeout(function(){e.setBusy(false)},1e3)},onViewPress:function(e){var t=e.getSource().getBindingContext();var a=t.getObject();var r=a.MaterialCode;var o=a.reqNo;console.log("Material code =",r);console.log("Material req no =",o);let i=this.getView().getModel();let l=i.bindList("/rqSubMaterial");var s=[new sap.ui.model.Filter("Parent_MaterialCode",sap.ui.model.FilterOperator.EQ,r),new sap.ui.model.Filter("reqNo",sap.ui.model.FilterOperator.EQ,o)];l.filter(s).requestContexts().then(function(e){if(e.length>0){let t=e.map(e=>e.getObject());let a=new sap.ui.model.json.JSONModel({rqSubMaterial:t});this._oDialog.setModel(a);this._oDialog.open()}else{sap.m.MessageBox.information("No Sub Component found for this :"+r)}}.bind(this)).catch(function(e){console.error("Error while requesting contexts:",e)});if(!this._oDialog){this._oDialog=sap.ui.xmlfragment("inventory.fragments.SubComponent",this);this.getView().addDependent(this._oDialog)}},handleValueHelpClose:function(){this._oDialog.close()},onDownloadPress:function(e){var t=e.getSource().getBindingContext();var a=t.getObject();var r=a.MaterialCode;var o=[];var i=[{label:"Material Req No",property:"MaterialReqNo"},{label:"Material Code",property:"MaterialCode"},{label:"Material Description",property:"MaterialDescription"},{label:"Category",property:"Category"},{label:"Status",property:"Status"},{label:"Created By",property:"CreatedBy"},{label:"Created On",property:"CreatedOn"},{label:"Sub Material Code",property:"SubMaterialCode"},{label:"Sub Description",property:"SubDescription"},{label:"Sub Category",property:"SubCategory"},{label:"Quantity",property:"Quantity"}];var l=this.getView().getModel().bindList("/rqSubMaterial",null,null,new sap.ui.model.Filter("Parent_MaterialCode",sap.ui.model.FilterOperator.EQ,r));l.requestContexts().then(function(e){e.forEach(function(e){var t=e.getObject();o.push({MaterialReqNo:a.reqNo,MaterialCode:a.MaterialCode,MaterialDescription:a.Description,Category:a.Category,Status:a.Status,CreatedBy:a.createdBy,CreatedOn:a.createdAt,SubMaterialCode:t.MaterialCode,SubDescription:t.Description,SubCategory:t.Category,Quantity:t.Quantity})});var t=new sap.ui.export.Spreadsheet({workbook:{columns:i},dataSource:o,fileName:"Material_Data.xlsx"});t.build().finally(function(){t.destroy()})}).catch(function(e){sap.m.MessageToast.show("Error fetching subcomponents.")})}})});
//# sourceMappingURL=InventoryDashboard.controller.js.map
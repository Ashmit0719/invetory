//@ui5-bundle config/Component-preload.js
sap.ui.require.preload({
	"config/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","config/model/models"],function(e,i,t){"use strict";return e.extend("config.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});
},
	"config/controller/App.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("config.controller.App",{onInit:function(){},onPressBack:function(){window.history.back()}})});
},
	"config/controller/ConfigDashboard.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],function(o){"use strict";return o.extend("config.controller.ConfigDashboard",{onInit:function(){},onPressSloc:function(){const o=this.getOwnerComponent().getRouter();o.navTo("RouteLocation")},onPressStatus:function(){const o=this.getOwnerComponent().getRouter();o.navTo("RouteStatus")},onPressMGroup:function(){const o=this.getOwnerComponent().getRouter();o.navTo("RouteGroup")}})});
},
	"config/controller/MaterialGroup.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageBox","sap/m/MessageToast"],function(e,t,a,o,s){"use strict";let i;return e.extend("config.controller.MaterialGroup",{onInit:function(){},_onCreateMaterialEntryDialog:function(){var e=this.getView();if(!this._oDialogItem){this._oDialogItem=sap.ui.xmlfragment("config.fragments.createMaterialGroup",this);e.addDependent(this._oDialogItem)}this._oDialogItem.open()},_handleValueHelpClose1:function(){this._oDialogItem.close()},_onSaveMaterialEntry:function(){var e=this.byId("materialGroupTable");let t=sap.ui.getCore().byId("typeField").getValue();let a=sap.ui.getCore().byId("locationIdField").getValue();let o=sap.ui.getCore().byId("ZcodeField").getValue();let s=sap.ui.getCore().byId("usabityInput").getValue();var i=this.getView().getModel();let l={ID:"",Type:t,Usability:s,Zcode:o,StorageLocation_LocationID:a};let r=i.bindList("/Category");r.create(l);this._oDialogItem.close();this.getView().getModel().refresh();setTimeout(()=>{sap.m.MessageToast.show("Data added successfully");e.removeSelections()},1e3)},_onEditMaterialDialog:function(){var e=this.byId("materialGroupTable");var t=e.getSelectedItems();if(t.length!==1){s.show("Please select a row first");return}var a=t[0];var o=a.getBindingContext();var i=o.getObject();if(!this._oDialog){this._oDialog=sap.ui.xmlfragment("config.fragments.updateMaterialGroup",this);this.getView().addDependent(this._oDialog)}let l=new sap.ui.model.json.JSONModel(i);this._oDialog.setModel(l,"editMaintainData");this._oDialog.open()},nUpdateMaterialGroupEntry:async function(){debugger;var e=this.getView();var t=this.byId("materialGroupTable");let a=sap.ui.getCore().byId("editIDInput").getValue();let o=sap.ui.getCore().byId("editCatgInput").getValue();let s=sap.ui.getCore().byId("editUsabilityInput").getValue();let i=sap.ui.getCore().byId("fieldTypeComboBox1").getValue();let l=sap.ui.getCore().byId("editLocationInput").getValue();var r=t.getSelectedItems();if(r.length!==1){sap.m.MessageToast.show("Please select one item to update.");return}var n=r[0];var g=n.getBindingContext();let u=this.getOwnerComponent().getModel();if(g.getProperty("ID")===a){g.setProperty("Type",o);g.setProperty("Usability",s);g.setProperty("StorageLocation_LocationID",l);g.setProperty("Zcode",i);try{await u.submitBatch("update");sap.m.MessageToast.show("Item updated successfully.");this._oDialog.close();t.removeSelections()}catch(e){sap.m.MessageToast.show("Error updating item: "+e.message)}}else{sap.m.MessageToast.show("The selected items StatusCode does not match the update data.")}},_onUpdateMaterialGroupEntry:async function(){debugger;var e=this.getView();var t=this.byId("materialGroupTable");var a=t.getSelectedItems();if(a.length!==1){sap.m.MessageToast.show("Please select one item to update.");return}var o=a[0];var s=o.getBindingContext();let i=sap.ui.getCore().byId("editIDInput").getValue();let l=sap.ui.getCore().byId("editCatgInput").getValue();let r=sap.ui.getCore().byId("editUsabilityInput").getValue();let n=sap.ui.getCore().byId("fieldTypeComboBox1").getValue();let g=sap.ui.getCore().byId("editLocationInput").getValue();s.setProperty("ID",i);s.setProperty("Type",l);s.setProperty("Usability",r);s.setProperty("Zcode",n);s.setProperty("StorageLocation_LocationID",g);let u=this.getOwnerComponent().getModel();try{await u.submitBatch("updateGroup");t.getBinding("items").refresh();sap.m.MessageToast.show("Item updated successfully.");this._oDialog.close();t.removeSelections()}catch(e){sap.m.MessageToast.show("Error updating item: "+e.message)}},_handleValueHelpClose2:function(){var e=this.byId("materialGroupTable");this._oDialog.close();e.removeSelections()},_onDeleteMaterialEntry:function(){let e=this.byId("materialGroupTable");let t=e.getSelectedItems();if(!t.length){s.show("Please Select at least one row ");return}const a=this;sap.ui.require(["sap/m/MessageBox"],function(o){o.confirm("Are you sure ,you want  to delete ?",{title:"Confirm ",onClose:function(s){if(s===o.Action.OK){a.deleteSelectedItems(t)}else{e.removeSelections();sap.m.MessageToast.show("Deletion canceled")}}})})},deleteSelectedItems:function(e){let t=e.length;let a=t===1?"Record":"Records";e.forEach(function(e){const t=e.getBindingContext();t.delete().then(function(){s.show(`${a} deleted sucessfully`)}).catch(function(e){o.error("Error deleting item: "+e.message)})})}})});
},
	"config/controller/MaterialStatus.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageBox","sap/m/MessageToast"],function(e,t,s,a,o){"use strict";let i;return e.extend("config.controller.MaterialStatus",{onInit:function(){},onCreate:function(){var e=this.getView();const s={StatusCode:"",Description:""};let a=new t(s);e.setModel(a,"addMaterialStatusModel");if(!this._oDialogItem){this._oDialogItem=sap.ui.xmlfragment("config.fragments.AddMaterialStatus",this);e.addDependent(this._oDialogItem)}this._oDialogItem.open()},handleValueHelpClose1:function(){this._oDialogItem.close()},onSave:function(){var e=this.getView();var t=this.byId("materialStatusTable");var s=this.getView().getModel("addMaterialStatusModel").getData();let a=s.StatusCode;let o=s.Description;let i={StatusCode:a,Description:o};let l=this.getView().getModel();let n=l.bindList("/Material_Status");n.create(i,true);n.attachCreateCompleted(s=>{let a=s.getParameters();if(a.success){setTimeout(()=>{sap.m.MessageToast.show("Material Status added successfully")},1e3);e.getModel().refresh();t.getBinding("items").refresh()}else{let e=a.context;let t=e.oModel.mMessages[""];sap.m.MessageBox.error(t[t.length-1].message)}});this._oDialogItem.close();t.removeSelections()},onEdit:function(){var e=this.byId("materialStatusTable");var s=e.getSelectedItems();if(s.length!==1){o.show("Please select exactly one item to edit.");return}var a=s[0];var i=a.getBindingContext();var l=i.getObject();let n=new t(l);this.getView().setModel(n,"editMaterialStatusModel");if(!this._oDialog){this._oDialog=sap.ui.xmlfragment("config.fragments.UpdateMaterialStatus",this);this.getView().addDependent(this._oDialog)}this._oDialog.open()},onUpdate:async function(){var e=this.getView();var t=this.byId("materialStatusTable");var s=e.getModel();var a=e.getModel("editMaterialStatusModel").getData();let o=a.StatusCode;let i=a.Description;var l=t.getSelectedItems();if(l.length!==1){sap.m.MessageToast.show("Please select one item to update.");return}var n=l[0];var r=n.getBindingContext();let d=this.getOwnerComponent().getModel();if(r.getProperty("StatusCode")===o){r.setProperty("Description",i);try{await d.submitBatch("update");sap.m.MessageToast.show("Item updated successfully.");this._oDialog.close();t.removeSelections()}catch(e){sap.m.MessageToast.show("Error updating item: "+e.message)}}else{sap.m.MessageToast.show("The selected items StatusCode does not match the update data.")}},handleValueHelpClose2:function(){var e=this.byId("materialStatusTable");this._oDialog.close();e.removeSelections()},onDelete:function(){let e=this.byId("materialStatusTable");let t=e.getSelectedItems();if(!t.length){o.show("Please Select at least one row ");return}const s=this;sap.ui.require(["sap/m/MessageBox"],function(a){a.confirm("Are you sure ,you want  to delete ?",{title:"Confirm ",onClose:function(o){if(o===a.Action.OK){s.deleteSelectedItems(t)}else{e.removeSelections();sap.m.MessageToast.show("Deletion canceled")}}})})},deleteSelectedItems:function(e){let t=e.length;let s=t===1?"Record":"Records";e.forEach(function(e){const t=e.getBindingContext();t.delete().then(function(){o.show(`${s} deleted sucessfully`)}).catch(function(e){a.error("Error deleting item: "+e.message)})})}})});
},
	"config/controller/StorageLocation.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageBox","sap/m/MessageToast"],function(e,t,o,s,a){"use strict";let i;return e.extend("config.controller.StorageLocation",{onInit:function(){},onCreate:function(){var e=this.getView();const o={LocationID:"",LocationName:""};const s=new t(o);e.setModel(s,"slocModel");if(!this._oDialogItem){this._oDialogItem=sap.ui.xmlfragment("config.fragments.addStorageLocation",this);e.addDependent(this._oDialogItem)}this._oDialogItem.open()},handleValueHelpClose1:function(){this._oDialogItem.close()},onSave:function(){var e=this.getView();var t=this.byId("slocTable");var o=this.getView().getModel("slocModel").getData();let s=o.LocationID;let a=o.LocationName;let i={LocationID:s,LocationName:a};let n=this.getView().getModel();let l=n.bindList("/StorageLocation");l.create(i,true);l.attachCreateCompleted(o=>{let s=o.getParameters();if(s.success){sap.m.MessageToast.show("Storage Location added successfully");e.getModel().refresh();t.getBinding("items").refresh()}else{let e=s.context;let t=e.oModel.mMessages[""];sap.m.MessageBox.error(t[t.length-1].message)}});this._oDialogItem.close();t.removeSelections()},onEdit:function(){var e=this.byId("slocTable");var o=e.getSelectedItems();if(o.length!==1){a.show("Please select exactly one item to edit.");return}var s=o[0];var i=s.getBindingContext();var n=i.getObject();const l=new t(n);this.getView().setModel(l,"slocModel");if(!this._oDialog){this._oDialog=sap.ui.xmlfragment("config.fragments.updateLocation",this);this.getView().addDependent(this._oDialog)}this._oDialog.open()},onUpdate:async function(){var e=this.getView();var t=this.byId("slocTable");var o=e.getModel();var s=e.getModel("slocModel").getData();let a=s.LocationID;let i=s.LocationName;var n=t.getSelectedItems();if(n.length!==1){sap.m.MessageToast.show("Please select one item to update.");return}var l=n[0];var c=l.getBindingContext();let r=this.getOwnerComponent().getModel();if(c.getProperty("LocationID")===a){c.setProperty("LocationName",i);try{await r.submitBatch("update");sap.m.MessageToast.show("Item updated successfully.");this._oDialog.close();t.removeSelections()}catch(e){sap.m.MessageToast.show("Error updating item: "+e.message)}}else{sap.m.MessageToast.show("The selected items Location ID does not match the update data.")}},handleValueHelpClose2:function(){var e=this.byId("slocTable");this._oDialog.close();e.removeSelections()},onDelete:function(){let e=this.byId("slocTable");let t=e.getSelectedItems();if(!t.length){a.show("Please Select at least one row ");return}const o=this;sap.ui.require(["sap/m/MessageBox"],function(s){s.confirm("Are you sure ,you want  to delete ?",{title:"Confirm ",onClose:function(a){if(a===s.Action.OK){o.deleteSelectedItems(t)}else{e.removeSelections();sap.m.MessageToast.show("Deletion canceled")}}})})},deleteSelectedItems:function(e){let t=e.length;let o=t===1?"Record":"Records";e.forEach(function(e){const t=e.getBindingContext();t.delete().then(function(){a.show(`${o} deleted sucessfully`)}).catch(function(e){s.error("Error deleting item: "+e.message)})})}})});
},
	"config/controller/StorageLocation3.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast","sap/m/MessageBox","sap/ui/model/Filter"],function(e,t,o,i){"use strict";var n;return e.extend("config.controller.StorageLocation",{onInit:function(){this.onStorageLocation()},onStorageLocation:function(){var e=new sap.ui.model.json.JSONModel;this.getView().setModel(e,"locationModel");let t=this.getOwnerComponent().getModel();let o=t.bindList("/StorageLocation");o.requestContexts(0,Infinity).then(function(t){var o=[];t.forEach(function(e){o.push(e.getObject())});e.setData({StorageLocations:o});console.log("location",o)})},onCreatePress:function(){if(!this.createDialog){this.createDialog=this.byId("createDialog")}this.createDialog.open()},onDialogCreatePress:function(){var e=this.byId("locationIDInput").getValue().trim();var o=this.byId("locationNameInput").getValue().trim();let i=this.byId("storageTable");if(!e||!o){t.show("Both Location ID and Location Name must be filled in.");return}let n=this.getView().getModel();let a=n.bindList("/StorageLocation");let s=new sap.ui.model.Filter("LocationID",sap.ui.model.FilterOperator.EQ,e);a.filter(s).requestContexts().then(function(s){if(s.length>0){t.show("Location ID already exists. Please use a different ID.");return}let l=new sap.ui.model.Filter("LocationName",sap.ui.model.FilterOperator.EQ,o);a.filter(l).requestContexts().then(function(s){if(s.length>0){t.show("Location Name already exists. Please use a different name.");return}var l={LocationID:e,LocationName:o};console.log("locationEntry",l);a.create(l,true);a.attachCreateCompleted(e=>{let t=e.getParameters();if(t.success){n.refresh();i.getBinding("items").refresh()}});t.show("Location Created: "+e+" - "+o);this.byId("locationIDInput").setValue("");this.byId("locationNameInput").setValue("");this.createDialog.close()}.bind(this))}.bind(this))},onDialogCancelPress:function(){this.createDialog.close()},onEditPress:function(){var e=this.byId("storageTable");var o=e.getSelectedItem();if(o){var i=o.getBindingContext("locationModel").getObject();this.byId("editLocationIDInput").setValue(i.LocationID);this.byId("editLocationNameInput").setValue(i.LocationName);if(!this.editDialog){this.editDialog=this.byId("editDialog")}this.editDialog.open()}else{t.show("Please select a row to edit.")}},onDialogSavePress:function(){var e=this.getView().byId("editLocationIDInput").getValue();var o=this.getView().byId("editLocationNameInput").getValue();let i=this.getView().getModel();let n=i.bindList("/StorageLocation");let a=new sap.ui.model.Filter("LocationID",sap.ui.model.FilterOperator.EQ,e);n.filter(a).requestContexts().then(function(e){if(e.length>0){e[0].setProperty("LocationName",o);i.refresh();t.show("Location updated successfully.")}else{t.show("Location not found.")}}.bind(this));this.editDialog.close()},onDialogCancelEditPress:function(){this.editDialog.close()},onRowSelect:function(e){var t=e.getParameter("listItem");if(t){var o=t.getBindingContext("locationModel");if(o){n=o.getProperty("LocationID");console.log("Selected Location ID: ",n)}}},onDeletePress:function(){var e=this.byId("storageTable");var i=e.getSelectedItem();if(e.getBinding("items").getLength()===0){t.show("No storage locations available.");return}if(i){var a=i.getBindingContext("locationModel");o.confirm("Are you sure you want to delete this storage location?",{title:"Confirm Deletion",onClose:function(e){if(e===o.Action.OK){let e=this.getView().getModel();let o=e.bindList("/StorageLocation");let i=new sap.ui.model.Filter("LocationID",sap.ui.model.FilterOperator.EQ,n);o.filter(i).requestContexts().then(function(e){if(e.length>0){e[0].delete();t.show("Storage location deleted successfully.");this.onStorageLocation()}else{t.show("Location not found.")}}.bind(this))}}.bind(this)})}else{t.show("Please select a row to delete.")}}})});
},
	"config/fragments/AddMaterialStatus.fragment.xml":'<core:FragmentDefinition xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"><Dialog\n        id="addMaterialStatusDialog"\n        class="sapUiContentPadding"\n        contentWidth="20%"\n        contentHeight="25%"\n        title="Add Material Status"\n        afterClose="handleValueHelpClose1"><VBox><Label text="Status Code"></Label><Input id="sfCode" value="{addMaterialStatusModel>/StatusCode}" ></Input><Label text="Staus Description"></Label><Input id="sfDesc" value="{addMaterialStatusModel>/Description}"></Input></VBox><beginButton><Button class="SaveUpdateText" text="Save" type="Accept" press="onSave" /></beginButton><endButton><Button text="Cancel" type="Reject" press="handleValueHelpClose1" /></endButton></Dialog></core:FragmentDefinition>\n',
	"config/fragments/UpdateMaterialStatus.fragment.xml":'<core:FragmentDefinition xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"><Dialog\n        id="updateMaterialStatusDialog1"\n        class="sapUiContentPadding"\n        contentWidth="20%"\n        contentHeight="25%"\n        title="Update Material Status"\n        afterClose="handleValueHelpClose2"><VBox><Label text="Status Code"></Label><Input id="sfCode1" value="{editMaterialStatusModel>/StatusCode}" editable="false" ></Input><Label text="Staus Description"></Label><Input id="sfDesc1" value="{editMaterialStatusModel>/Description}"></Input></VBox><beginButton><Button text="Update" type="Accept" press="onUpdate"  /></beginButton><endButton><Button text="Cancel" type="Reject" press="handleValueHelpClose2" /></endButton></Dialog></core:FragmentDefinition>\n',
	"config/fragments/addStorageLocation.fragment.xml":'<core:FragmentDefinition xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"><Dialog\n        id="addMaterialStatusDialog4"\n        class="sapUiContentPadding"\n        contentWidth="20%"\n        contentHeight="25%"\n        title="Create Storage Location"\n        afterClose="handleValueHelpClose1"><VBox><Label text="Location ID"></Label><Input id="sloc1" value="{slocModel>/LocationID}" ></Input><Label text="Location Name"></Label><Input id="slocName1" value="{slocModel>/LocationName}"></Input></VBox><beginButton><Button class="SaveUpdateText" text="Save" type="Accept" press="onSave" /></beginButton><endButton><Button text="Cancel" type="Reject" press="handleValueHelpClose1" /></endButton></Dialog></core:FragmentDefinition>\n',
	"config/fragments/createMaterialGroup.fragment.xml":'<core:FragmentDefinition xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"><Dialog\n        id="addMaterialStatusDialog1"\n        class="sapUiContentPadding"\n        contentWidth="20%"\n        title="Add Material Status"\n        afterClose="_handleValueHelpClose1"><VBox><Label id="_IDGenLabel119" text="Category :" /><Input id="typeField" liveChange="inputHandler" placeholder="Enter Category" /><Label id="_IDGenLabel182" text="Location ID :" /><Input id="locationIdField" liveChange="inputHandler" placeholder="Enter Location ID" /><Label id="_IDGenLabel162" text="Zcode :" /><Input id="ZcodeField" width="100%"/><Label id="_IDGenLabel13" text="Usability :" /><Input id="usabityInput" required="true" liveChange="onStringLengthChange" /></VBox><beginButton><Button class="SaveUpdateText" text="Save" type="Accept" press="_onSaveMaterialEntry" /></beginButton><endButton><Button text="Cancel" type="Reject" press="_handleValueHelpClose1" /></endButton></Dialog></core:FragmentDefinition>\n',
	"config/fragments/updateLocation.fragment.xml":'<core:FragmentDefinition xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"><Dialog\n        id="updateMaterialStatusDialog2"\n        class="sapUiContentPadding"\n        contentWidth="20%"\n        contentHeight="25%"\n        title="Update Storage Location"\n        afterClose="handleValueHelpClose2"><VBox><Label text="Status Code"></Label><Input id="sloc2" value="{slocModel>/LocationID}" editable="false" ></Input><Label text="Staus Description"></Label><Input id="slocName2" value="{slocModel>/LocationName}"></Input></VBox><beginButton><Button text="Update" type="Accept" press="onUpdate"  /></beginButton><endButton><Button text="Cancel" type="Reject" press="handleValueHelpClose2" /></endButton></Dialog></core:FragmentDefinition>\n',
	"config/fragments/updateMaterialGroup.fragment.xml":'<core:FragmentDefinition xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"><Dialog\n        id="updateMaterialStatusDialog"\n        class="sapUiContentPadding"\n        contentWidth="20%"\n        title="Update Material Status"\n        afterClose="handleValueHelpClose2"><VBox><Label id="editID" text="Category ID :" /><Input id="editIDInput" liveChange="inputHandler" editable="false" value="{editMaintainData>/ID}"/><Label id="editCatg" text="Category :" /><Input id="editCatgInput" liveChange="inputHandler" value="{editMaintainData>/Type}"/><Label id="editLocation" text="Location ID :" /><Input id="editLocationInput" value="{editMaintainData>/StorageLocation_LocationID}" /><Label id="editZcode" text="Zcode :" /><Input id="fieldTypeComboBox1" width="100%" value="{editMaintainData>/Zcode}" /><Label id="editUsabilityLabel" text="Usability :" /><Input id="editUsabilityInput" value="{editMaintainData>/Usability}"/></VBox><beginButton><Button text="Update" type="Accept" press="_onUpdateMaterialGroupEntry"  /></beginButton><endButton><Button text="Cancel" type="Reject" press="_handleValueHelpClose2" /></endButton></Dialog></core:FragmentDefinition>\n',
	"config/i18n/i18n.properties":'# This is the resource bundle for config\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App Title\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Config Dashboard\n\n#XFLD,30\nflpTitle=Config\n\n#XFLD,48\nflpTitle=Config Dashboard\n',
	"config/manifest.json":'{"_version":"1.65.0","sap.app":{"id":"config","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.15.1","toolsId":"58f42e22-bf61-43b4-b625-6520e6acb28a"},"dataSources":{"mainService":{"uri":"odata/v4/inventory/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"config-display":{"semanticObject":"config","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}},"Config-display":{"semanticObject":"Config","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.129.1","libs":{"sap.m":{},"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"config.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"config.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteConfigDashboard","pattern":":?query:","target":["TargetConfigDashboard"]},{"name":"RouteStatus","pattern":"status","target":["TargetConfigStatus"]},{"name":"RouteGroup","pattern":"group","target":["TargetConfigGroup"]},{"name":"RouteGroup","pattern":"group","target":["TargetConfigGroup"]},{"name":"RouteLocation","pattern":"storageLocation","target":["TargetConfigStorageLocation"]}],"targets":{"TargetConfigDashboard":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"ConfigDashboard","viewName":"ConfigDashboard"},"TargetConfigStatus":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"MaterialStatus","viewName":"MaterialStatus"},"TargetConfigGroup":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"MaterialGroup","viewName":"MaterialGroup"},"TargetConfigStorageLocation":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"StorageLocation","viewName":"StorageLocation"}}},"rootView":{"viewName":"config.view.App","type":"XML","async":true,"id":"App"},"sap.cloud":{"public":true,"service":"putoutinventory-srv"}},"sap.cloud":{"public":true,"service":"inventoryCloudService"}}',
	"config/model/models.js":function(){
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"config/view/App.view.xml":'\n<mvc:View controllerName="config.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns:f="sap.f"\n    xmlns="sap.m"\n    xmlns:tnt="sap.tnt"><tnt:ToolPage id="toolPage"><tnt:header><tnt:ToolHeader id="_IDGenToolHeader1" ><Button visible="true" icon="sap-icon://nav-back" type="Transparent" id="_IDGenButton26" press="onPressBack" tooltip="Search"/><ToolbarSpacer id="_IDGenToolbarSpacer1" width="15px" /><Title text="Pull Out Inventory" wrapping="true" id="productName"/><ToolbarSpacer id="_IDGenToolbarSpacer2"/><Avatar id="_IDGenAvatar1" src="" displaySize="XS" press=".onAvatarPressed" tooltip="Profile"/></tnt:ToolHeader></tnt:header><tnt:mainContents><App id="app"></App></tnt:mainContents></tnt:ToolPage></mvc:View>\n',
	"config/view/ConfigDashboard.view.xml":'<mvc:View controllerName="config.controller.ConfigDashboard"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><Page id="page" title="{i18n>title}"><GenericTile id="_IDGenGenericTile1" class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Material Status" press="onPressStatus" /><GenericTile id="_IDGenGenericTile2" class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Material Groups" press="onPressMGroup" /><GenericTile id="_IDGenGenericTile3" class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Storage Location" press="onPressSloc" /></Page></mvc:View>\n',
	"config/view/MaterialGroup.view.xml":'<mvc:View controllerName="config.controller.MaterialGroup"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns:l="sap.ui.layout"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"><Page id="page" title="Material Group"><l:VerticalLayout id="_IDGenVerticalLayout1" width="100%" ><l:BlockLayout\n                id="_IDGenBlockLayout1"\n                background="Dashboard" \n            ><l:BlockLayoutRow id="_IDGenBlockLayoutRow1"><l:BlockLayoutCell\n                id="_IDGenBlockLayoutCell1"\n                width="90%"\n            ><HBox class="btnbottomBorder" justifyContent="Start"><Button  text="Create" press="_onCreateMaterialEntryDialog" type="Emphasized"></Button><Button class="btnCrud sapUiTinyMarginBegin"  text="Edit" press="_onEditMaterialDialog" type="Emphasized"></Button><Button class="btnCrud sapUiTinyMarginBegin" text="Delete" press="_onDeleteMaterialEntry" type="Emphasized"></Button></HBox><Table\n                id="materialGroupTable"\n                width="100%"\n                class="tables"\n                alternateRowColors="true"\n                mode="MultiSelect"\n                items="{/Category}"\n                ><columns><Column id="_IDGenColumn3" ><Text id="_IDGenText3" text="Category" /></Column><Column id="_IDGenColumn4"><Text id="_IDGenText4" text="Location Id" /></Column><Column id="_IDGenColumn5"><Text id="_IDGenText5" text="Zcode" /></Column><Column id="_IDGenColumn6"><Text id="_IDGenText6" text="Usability" /></Column></columns><items><ColumnListItem id="_IDGenColumnListItem2"><cells><Text id="typeInput" text="{Type}" /><Text id="locationIdInput" text="{StorageLocation_LocationID}" /><Text id="zcodeInput" text="{Zcode}" /><Text id="usabilityInput" text="{Usability}" /></cells></ColumnListItem></items></Table></l:BlockLayoutCell></l:BlockLayoutRow></l:BlockLayout></l:VerticalLayout></Page></mvc:View>\n',
	"config/view/MaterialStatus.view.xml":'<mvc:View controllerName="config.controller.MaterialStatus"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns:l="sap.ui.layout"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"><Page id="page1" title="Material Status"><l:VerticalLayout id="_IDGenVerticalLayout111" width="100%" ><l:BlockLayout\n                id="_IDGenBlockLayout111"\n                background="Dashboard" \n            ><l:BlockLayoutRow id="_IDGenBlockLayoutRow111"><l:BlockLayoutCell\n                id="_IDGenBlockLayoutCell111"\n                width="90%"\n            ><HBox class="btnbottomBorder" justifyContent="Start"><Button   text="Create" press="onCreate" type="Emphasized"></Button><Button class="btnCrud"  text="Edit" press="onEdit" type="Emphasized"></Button><Button class="btnCrud" text="Delete" press="onDelete" type="Emphasized"></Button></HBox><Table\n                id="materialStatusTable"\n                width="100%"\n                class="tables"\n                alternateRowColors="true"\n                mode="MultiSelect"\n                items="{/Material_Status}"\n                ><columns><Column id="_IDGenColumn3" ><Text id="_IDGenText3" text="Status Code" /></Column><Column id="_IDGenColumn4"><Text id="_IDGenText4" text=" Status Description" /></Column></columns><items><ColumnListItem id="_IDGenColumnListItem2"><cells><Text id="sCode" text="{StatusCode}" /><Text id="sDesc" text="{Description}" /></cells></ColumnListItem></items></Table></l:BlockLayoutCell></l:BlockLayoutRow></l:BlockLayout></l:VerticalLayout></Page></mvc:View>',
	"config/view/StorageLocation.view.xml":'<mvc:View controllerName="config.controller.StorageLocation"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns:l="sap.ui.layout"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"><Page id="" title="Storgae Location"><l:VerticalLayout id="_IDGenVerticalLayout10" width="100%" ><l:BlockLayout\n                id="_IDGenBlockLayout10"\n                background="Dashboard" \n            ><l:BlockLayoutRow id="_IDGenBlockLayoutRow10"><l:BlockLayoutCell\n                id="_IDGenBlockLayoutCell10"\n                width="90%"\n            ><HBox class="btnbottomBorder" justifyContent="Start"><Button   text="Create" press="onCreate" type="Emphasized"></Button><Button class="btnCrud"  text="Edit" press="onEdit" type="Emphasized"></Button><Button class="btnCrud" text="Delete" press="onDelete" type="Emphasized"></Button></HBox><Table\n                id="slocTable"\n                width="100%"\n                class="tables"\n                alternateRowColors="true"\n                mode="MultiSelect"\n                items="{/StorageLocation}"\n                ><columns><Column id="_IDGenColumn31" ><Text id="_IDGenText31" text="Location Id" /></Column><Column id="_IDGenColumn41"><Text id="_IDGenText42" text="Location Name" /></Column></columns><items><ColumnListItem id="_IDGenColumnListItem21"><cells><Text id="sloc" text="{LocationID}" /><Text id="slocName" text="{LocationName}" /></cells></ColumnListItem></items></Table></l:BlockLayoutCell></l:BlockLayoutRow></l:BlockLayout></l:VerticalLayout></Page></mvc:View>\n',
	"config/view/StorageLocation5.view.xml":'<mvc:View\n    controllerName="config.controller.StorageLocation"\n   xmlns:mvc="sap.ui.core.mvc"\n    displayBlock="true"\n    xmlns:l="sap.ui.layout"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n><Page\n        id="page1"\n        title="Storage Location"\n    ><l:VerticalLayout\n            id="_IDGenVerticalLayout11"\n            width="98%"\n        ><l:BlockLayout\n                id="_IDGenBlockLayout11"\n                background="Dashboard"\n            ><l:BlockLayoutRow id="_IDGenBlockLayoutRow11"><l:BlockLayoutCell\n                        id="_IDGenBlockLayoutCell11"\n                        width="90%"\n                    ><HBox\n                            id="_IDGenHBox1"\n                            class="btnbottomBorder"\n                            justifyContent="Start"\n                        ><Button\n                                id="_IDGenButton"\n                                class="sapUiSmallMarginEnd"\n                                text="Create"\n                                press="onCreatePress"\n                                type="Emphasized"\n                            /><Button\n                                id="_IDGenButton1"\n                                class="sapUiSmallMarginEnd"\n                                text="Edit"\n                                press="onEditPress"\n                                type="Emphasized"\n                            /><Button\n                                id="_IDGenButton2"\n                                class="btnCrud"\n                                text="Delete"\n                                press="onDeletePress"\n                                type="Emphasized"\n                            /></HBox><Table\n                            id="storageTable"\n                            inset="false"\n                            alternateRowColors="true"\n                            items="{locationModel>/StorageLocations}"\n                            mode="MultiSelect"\n                            selectionChange="onRowSelect"\n                            class="tables sapUiSmallMarginTop"\n                            width="100%"\n                        ><columns ><Column id="_IDGenColumn"><Text\n                                        id="_IDGenText"\n                                        text="Location ID"\n                                    /></Column><Column id="_IDGenColumn1"><Text\n                                        id="_IDGenText1"\n                                        text="Location Name"\n                                    /></Column></columns><items><ColumnListItem id="_IDGenColumnListItem"><cells><Text\n                                            id="_IDGenText41"\n                                            text="{locationModel>LocationID}"\n                                        /><Text\n                                            id="_IDGenText51"\n                                            text="{locationModel>LocationName}"\n                                        /></cells></ColumnListItem></items></Table><Dialog\n                            id="createDialog"\n                            title="Create Storage Location"\n                            type="Message"\n                        ><content><VBox id="_IDGenVBox"><Label\n                                        id="_IDGenLabel"\n                                        text="Location ID"\n                                        required="true"\n                                    /><Input id="locationIDInput" /><Label\n                                        id="_IDGenLabel1"\n                                        text="Location Name"\n                                        required="true"\n                                    /><Input id="locationNameInput" /></VBox></content><beginButton><Button\n                                    id="_IDGenButton4"\n                                    text="Create"\n                                    press="onDialogCreatePress"\n                                /></beginButton><endButton><Button\n                                    id="_IDGenButton5"\n                                    text="Cancel"\n                                    press="onDialogCancelPress"\n                                /></endButton></Dialog><Dialog\n                            id="editDialog"\n                            title="Edit Storage Location"\n                            type="Message"\n                        ><content><VBox id="_IDGenVBoxEdit"><Label\n                                        id="_IDGenLabelEdit"\n                                        text="Location ID"\n                                        required="true"\n                                    /><Input\n                                        id="editLocationIDInput"\n                                        editable="false"\n                                    /><Label\n                                        id="_IDGenLabelEdit1"\n                                        text="Location Name"\n                                        required="true"\n                                    /><Input id="editLocationNameInput" /></VBox></content><beginButton><Button\n                                    id="_IDGenButtonEdit"\n                                    text="Save"\n                                    press="onDialogSavePress"\n                                /></beginButton><endButton><Button\n                                    id="_IDGenButtonCancelEdit"\n                                    text="Cancel"\n                                    press="onDialogCancelEditPress"\n                                /></endButton></Dialog></l:BlockLayoutCell></l:BlockLayoutRow></l:BlockLayout></l:VerticalLayout></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
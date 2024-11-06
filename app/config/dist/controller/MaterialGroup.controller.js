sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageBox","sap/m/MessageToast"],function(e,t,a,o,s){"use strict";let i;return e.extend("config.controller.MaterialGroup",{onInit:function(){},_onCreateMaterialEntryDialog:function(){var e=this.getView();if(!this._oDialogItem){this._oDialogItem=sap.ui.xmlfragment("config.fragments.createMaterialGroup",this);e.addDependent(this._oDialogItem)}this._oDialogItem.open()},_handleValueHelpClose1:function(){this._oDialogItem.close()},_onSaveMaterialEntry:function(){var e=this.byId("materialGroupTable");let t=sap.ui.getCore().byId("typeField").getValue();let a=sap.ui.getCore().byId("locationIdField").getValue();let o=sap.ui.getCore().byId("ZcodeField").getValue();let s=sap.ui.getCore().byId("usabityInput").getValue();var i=this.getView().getModel();let l={ID:"",Type:t,Usability:s,Zcode:o,StorageLocation_LocationID:a};let r=i.bindList("/Category");r.create(l);this._oDialogItem.close();this.getView().getModel().refresh();setTimeout(()=>{sap.m.MessageToast.show("Data added successfully");e.removeSelections()},1e3)},_onEditMaterialDialog:function(){var e=this.byId("materialGroupTable");var t=e.getSelectedItems();if(t.length!==1){s.show("Please select a row first");return}var a=t[0];var o=a.getBindingContext();var i=o.getObject();if(!this._oDialog){this._oDialog=sap.ui.xmlfragment("config.fragments.updateMaterialGroup",this);this.getView().addDependent(this._oDialog)}let l=new sap.ui.model.json.JSONModel(i);this._oDialog.setModel(l,"editMaintainData");this._oDialog.open()},nUpdateMaterialGroupEntry:async function(){debugger;var e=this.getView();var t=this.byId("materialGroupTable");let a=sap.ui.getCore().byId("editIDInput").getValue();let o=sap.ui.getCore().byId("editCatgInput").getValue();let s=sap.ui.getCore().byId("editUsabilityInput").getValue();let i=sap.ui.getCore().byId("fieldTypeComboBox1").getValue();let l=sap.ui.getCore().byId("editLocationInput").getValue();var r=t.getSelectedItems();if(r.length!==1){sap.m.MessageToast.show("Please select one item to update.");return}var n=r[0];var g=n.getBindingContext();let u=this.getOwnerComponent().getModel();if(g.getProperty("ID")===a){g.setProperty("Type",o);g.setProperty("Usability",s);g.setProperty("StorageLocation_LocationID",l);g.setProperty("Zcode",i);try{await u.submitBatch("update");sap.m.MessageToast.show("Item updated successfully.");this._oDialog.close();t.removeSelections()}catch(e){sap.m.MessageToast.show("Error updating item: "+e.message)}}else{sap.m.MessageToast.show("The selected items StatusCode does not match the update data.")}},_onUpdateMaterialGroupEntry:async function(){debugger;var e=this.getView();var t=this.byId("materialGroupTable");var a=t.getSelectedItems();if(a.length!==1){sap.m.MessageToast.show("Please select one item to update.");return}var o=a[0];var s=o.getBindingContext();let i=sap.ui.getCore().byId("editIDInput").getValue();let l=sap.ui.getCore().byId("editCatgInput").getValue();let r=sap.ui.getCore().byId("editUsabilityInput").getValue();let n=sap.ui.getCore().byId("fieldTypeComboBox1").getValue();let g=sap.ui.getCore().byId("editLocationInput").getValue();s.setProperty("ID",i);s.setProperty("Type",l);s.setProperty("Usability",r);s.setProperty("Zcode",n);s.setProperty("StorageLocation_LocationID",g);let u=this.getOwnerComponent().getModel();try{await u.submitBatch("updateGroup");t.getBinding("items").refresh();sap.m.MessageToast.show("Item updated successfully.");this._oDialog.close();t.removeSelections()}catch(e){sap.m.MessageToast.show("Error updating item: "+e.message)}},_handleValueHelpClose2:function(){var e=this.byId("materialGroupTable");this._oDialog.close();e.removeSelections()},_onDeleteMaterialEntry:function(){let e=this.byId("materialGroupTable");let t=e.getSelectedItems();if(!t.length){s.show("Please Select at least one row ");return}const a=this;sap.ui.require(["sap/m/MessageBox"],function(o){o.confirm("Are you sure ,you want  to delete ?",{title:"Confirm ",onClose:function(s){if(s===o.Action.OK){a.deleteSelectedItems(t)}else{e.removeSelections();sap.m.MessageToast.show("Deletion canceled")}}})})},deleteSelectedItems:function(e){let t=e.length;let a=t===1?"Record":"Records";e.forEach(function(e){const t=e.getBindingContext();t.delete().then(function(){s.show(`${a} deleted sucessfully`)}).catch(function(e){o.error("Error deleting item: "+e.message)})})}})});
//# sourceMappingURL=MaterialGroup.controller.js.map
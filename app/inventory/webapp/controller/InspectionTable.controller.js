sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
],
    function (Controller, Fragment, JSONModel, MessageBox, MessageToast) {
        "use strict";
        let flag = 0;
        let originalValue=0;
        return Controller.extend("inventory.controller.InspectionTable", {
            onInit: async function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteInspectionTable").attachPatternMatched(this._onObjectMatched, this);
                const materialData = JSON.parse(sessionStorage.getItem("materialData"));
                const servNo = materialData ? materialData : null;
                
                if (servNo) {
                    // Get the OData model
                    let oModel = this.getView().getModel();
            
                    // Filter to check the status of the current reqNo in the backend
                    let oBindingList = oModel.bindList("/serviceRequest");
                    let aFilters = [new sap.ui.model.Filter("reqNo", sap.ui.model.FilterOperator.EQ, servNo)];
                    let aContexts = await oBindingList.filter(aFilters).requestContexts();
            
                    if (aContexts.length > 0) {
                        let oServiceRequestContext = aContexts[0];
                        let reqStatus = oServiceRequestContext.getProperty("reqStatus");
            
                        // Check if reqStatus indicates the layout should display as completed
                        if (reqStatus === "Inspection Completed") {
                            this.byId("materialDetailsLayout").setVisible(false);
                            this.byId("materialDetailsLayout1").setVisible(true);
                        } else {
                            this.byId("materialDetailsLayout").setVisible(true);
                            this.byId("materialDetailsLayout1").setVisible(false);
                        }
                    }
                }
            },
            
            resetTableControls: function () {
                let oTable = this.byId("materialTable");
                oTable.getItems().forEach(function (oItem) {
                    let aCells = oItem.getCells();
                    let oQuantityInput = aCells[5]; // Assuming Quantity is at index 5
            
                    if (oQuantityInput instanceof sap.m.Input) {
                        // Store the original value only if it hasn't been stored already
                        if (!oQuantityInput.data("originalValue")) {
                            oQuantityInput.data("originalValue", oQuantityInput.getValue());
                        }
                    }
                });
            },
            
        
            onMaterialRowSelect: async function (oEvent) {
                const oView = this.getView();
                let oRowContext = oEvent.getSource().getParent().getBindingContext("materialData");
                let selectedMaterial = oRowContext.getObject();
                let mat_code = selectedMaterial.MaterialCode
                const requestNumber = JSON.parse(sessionStorage.getItem("materialData"));
                let oModel = this.getOwnerComponent().getModel();
                let oBindList = oModel.bindList("/rqSubMaterial", undefined, undefined, undefined, undefined);
                let aContexts = await oBindList.requestContexts(0, Infinity);
                let data = aContexts.map(oContext => oContext.getObject());

                let filterData = data.filter(item => {
                    return item.reqNo === requestNumber && item.Parent_MaterialCode === mat_code;
                });

                console.log("Bid details data:", filterData);
                let subMaterials = filterData || [];
                if (!this.expandCheckinDataFragment) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "inventory.fragments.subComponent",
                        controller: this
                    }).then(oDialog => {
                        this.expandCheckinDataFragment = oDialog;
                        oView.addDependent(this.expandCheckinDataFragment);
                        let subModel = new sap.ui.model.json.JSONModel(subMaterials);
                        this.expandCheckinDataFragment.setModel(subModel, "subMaterialData");
                        this.expandCheckinDataFragment.open();
                    }).catch(err => {
                        console.error("Failed to load fragment:", err);
                    });
                } else {
                    let subModel = new sap.ui.model.json.JSONModel(subMaterials);
                    this.expandCheckinDataFragment.setModel(subModel, "subMaterialData");
                    this.expandCheckinDataFragment.open();
                }
            },

            _onStatusTypeChange: function (oEvent) {
                var oSelect = oEvent.getSource();
                var sSelectedText = oSelect.getSelectedItem().getText();
                console.log("selected item", sSelectedText);
               
            },


            _onObjectMatched: async function () {
                try {
                    this.resetTableControls();
                    const requestNumber = JSON.parse(sessionStorage.getItem("materialData"));
                    console.log("Request Number:", requestNumber);  // Log the request number
                    let oModel = this.getOwnerComponent().getModel();

                    let oBindList = oModel.bindList("/rqMaterial", undefined, undefined, undefined, undefined);
                    let aContexts = await oBindList.requestContexts(0, Infinity);
                    let data = aContexts.map(oContext => oContext.getObject());

                    let filterData = data.filter(item => {
                        return item.reqNo === requestNumber;
                    });
                    console.log("Filtered Data:", filterData);  // Log the filtered data

                    let dataModel = new JSONModel(filterData);
                    this.getView().setModel(dataModel, "materialData");

                    let oTable = this.byId("materialTable");
                    oTable.attachEventOnce("updateFinished", this.resetTableControls.bind(this));
                } catch (error) {
                    console.error("Error loading material data:", error);
                    sap.m.MessageToast.show("Error loading material data: " + error.message);
                }
            },

            _onCancelCheckinSubFragment: function () {
                this.expandCheckinDataFragment.close()
            },


            onSubmit: async function () {
                // Get the OData model
                // Get the items from the material table
                
                let oTable = this.byId("materialTable");
                let aItems = oTable.getBinding("items").getCurrentContexts();
            
                // Iterate over the items to construct the payload
                aItems.forEach((oContext) => {
                    let oData = oContext.getObject(); // Get the data for each row
            
                    // Construct the payload for the create operation
                    let payload = {
                        reqNo: oData.reqNo,
                        MaterialCode: oData.MaterialCode,
                        MatStatus: oData.Status,
                        Quantity: parseInt(oData.Quantity),
                        MatRemarks: oData.Remarks,
                        f_MaterialCode: oData.f_MaterialCode,
                    };
                    console.log("payload", payload);
            
                    let oModel2 = this.getOwnerComponent().getModel();
                    let oBindList4 = oModel2.bindList("/splitMaterilalTable");
                    oBindList4.create(payload);
                        
                    sap.m.MessageToast.show("Successfully Submitted");          
                });  
            
                let oModel = this.getView().getModel();
                const materialData = JSON.parse(sessionStorage.getItem("materialData"));
                const servNo = materialData ? materialData : null;
            
                if (servNo) {
                    // Filter and fetch the request context based on reqNo
                    let oBindingList = oModel.bindList("/serviceRequest");
                    let aFilters = [new sap.ui.model.Filter("reqNo", sap.ui.model.FilterOperator.EQ, servNo)];
                    let aContexts = await oBindingList.filter(aFilters).requestContexts();
            
                    if (aContexts.length > 0) {
                        let oServiceRequestContext = aContexts[0];
            
                        // Set reqStatus to "Inspection Completed" to mark this as processed
                        await oServiceRequestContext.setProperty("reqStatus", "Inspection Completed");
                        
                        // Submit changes to persist them in the backend
                        await oModel.submitBatch("submitGroup"); // Assuming "submitGroup" is the batch group ID
                    }
                }
            
                sap.m.MessageToast.show("Successfully Submitted");
            
                // Set materialDetailsLayout visibility
                this.byId("materialDetailsLayout").setVisible(false);
                this.byId("materialDetailsLayout1").setVisible(true);
            },
            
            
            
           
            showCategoryValueHelp : function ( oEvent ) {
                console.log("BUTTON");
                this.oSource = oEvent.getSource();
                this.oRowContext = this.byId('materialTable').getSelectedItem().getBindingContext('materialData');
                this.oRowData =  this.oRowContext.getObject();
                if (!this._CategoryDialog) {
                    this._CategoryDialog = sap.ui.xmlfragment(
                        "inventory.fragments.CategoryValueHelp",
                        this
                    );
                    this.getView().addDependent(this._CategoryDialog);
                }
 
                // Clear any existing filters on the SelectDialog
                this._CategoryDialog.open();
                if (this._CategoryDialog) {
 
                    this._CategoryDialog.getBinding("items").filter([]);
                }
 
            },
            onCategoryValueHelpClose : function (oEvent) {

                let oSelectedItem = oEvent.getParameter("selectedItem");

                this.obj = oSelectedItem.getBindingContext().getObject();
            

                // // Find the input field that triggered the value help (Description input)
                let oInput = this.oSource;
                this.prevValue = oInput.getProperty('value');
                this.oSource.setValue(this.obj.Type);


                if (!oSelectedItem) {
                    if (that._CategoryDialog) {

                        that._CategoryDialog.destroy();
                        that._CategoryDialog = null;
                    }
                    return;
                }

            },
            onPressChangeCategory: function () {
                console.log("Change category button pressed");
           
                // Get the reference to the material table
                var oTable = this.byId("materialTable");
           
                // Get the selected item
                var oSelectedItem = oTable.getSelectedItem();
                if (oSelectedItem) {
                    // Get the cells of the selected row
                    var aCells = oSelectedItem.getCells();
                    if( aCells[1].getValue() !== aCells[2].getValue()){
                        MessageToast.show("New code already Generated");
                        return;
                    }
           
                    // Assuming IDs are correct:
                    var oCategoryInput = aCells[2]; // Assuming Category input is at index 2
                    var oDescriptionInput = aCells[3]; // Assuming Description input is at index 3
           
                    // Set both inputs to be editable
                    if (oCategoryInput instanceof sap.m.Input) {
                        oCategoryInput.setEditable(true);
                    }
                    if (oDescriptionInput instanceof sap.m.Input) {
                        oDescriptionInput.setEditable(true);
                    }
                    this.byId('changeCategoryBtn').setVisible(false);
                    this.byId('newCodeGenerationBtn').setVisible(true);

                } else {
                    sap.m.MessageToast.show("Please select a row to change category.");
                }
            },
            onGenerateNewCode: async function ( oEvent ){

                const requestNumber = JSON.parse(sessionStorage.getItem("materialData"));
                let oModel = this.getOwnerComponent().getModel();
                let oBindList = oModel.bindList("/rqSubMaterial", undefined, undefined, undefined, undefined);
                let oBindList2 = oModel.bindList("/Material");
                let aContexts = await oBindList.requestContexts(0, Infinity);
                let data = aContexts.map(oContext => oContext.getObject());
                let oSelectedItem = this.byId('materialTable').getSelectedItem();
              

                if( !this.obj ) {
                    MessageBox.warning("Please Change Category");
                    return
                }
                let filterData = data.filter(item => {
                    return item.reqNo === requestNumber && item.Parent_MaterialCode === this.oRowData.MaterialCode;
                });
                let subMaterials = filterData || [];
                console.log(subMaterials);
                let SubcomponentList1 = [];
                subMaterials.forEach( sub => {
                    let payload = {
                        Description: sub.Description,
                        MaterialCode: sub.MaterialCode,
                        Category: sub.Category,
                        Quantity: sub.Quantity,
                        Parent_MaterialCode : ""
                    }
                    SubcomponentList1.push(payload)
                })
                if( this.oRowData.MaterialCode !== this.oRowData.f_MaterialCode){
                    sap.m.MessageToast.show("New Code already Generated");
                    return
                }
            
                if( this.prevValue !== this.obj.Type){
                    
                    this.oSource.setValue(this.obj.Type);
                    console.log("fkjdsfj", this.prevValue, this.oRowData);
                    let payload =  {
                        Description: this.oRowData.Description,
                        Category: this.oRowData.Category,
                        MaterialCode: "",
                        Status: "Active",
                        Quantity: parseInt(this.oRowData.Quantity),
                        SubcomponentList: SubcomponentList1
                    }
                    oBindList2.create( payload , true);
        
                    // Attach the create completion handler
                    oBindList2.attachCreateCompleted((p) => {
                        let p1 = p.getParameters();
                        let oContext = p1.context;
                        if (p1.success) {
                            let obj = oContext.getObject();
                            console.log(obj);
                            MessageBox.success(`New code ${obj.MaterialCode} generated Successfully`);
                            this.oRowData.f_MaterialCode = obj.MaterialCode;
                            subMaterials.forEach( sub => sub.Parent_MaterialCode = this.oRowData.f_MaterialCode);
                            console.log("sub materials and material ", subMaterials);

                            this.getView().getModel('materialData').refresh();
                            if( oSelectedItem){
                                oSelectedItem.getCells()[2].setEditable(false);
                                oSelectedItem.getCells()[3].setEditable(false);
                                this.byId('materialTable').removeSelections();
                    
                            }
                            this.byId('changeCategoryBtn').setVisible(true);
                            this.byId('newCodeGenerationBtn').setVisible(false);
                           
                        } else {
                            reject(p1);  // Reject the promise if there's an error
                        }
                    });
                
                    
                }else {
                    MessageBox.error("Please Change Category");
                }

            },
          

            quantityChange: function (oEvent) {
                let oInput = oEvent.getSource(); // The Input that triggered the event
                let newValue = parseFloat(oInput.getValue()); // Get the new value entered by the user and convert it to a number
             if(originalValue==0 ){
                originalValue = parseFloat(oInput.data("originalValue"));} // Retrieve the original value stored and convert it to a number
                if (!isNaN(originalValue) && !isNaN(newValue)) {
                    let quantityDifference = originalValue - newValue; // Calculate the difference
                    console.log("Original Quantity:", originalValue);
                    console.log("New Quantity:", newValue);
                    console.log("Difference in Quantity:", quantityDifference);
                    // Check if the new quantity exceeds the original quantity
                    if (quantityDifference < 0) {
                        // If the quantity difference is negative, display a message and don't add a new row
                        sap.m.MessageToast.show("Original quantity exceeded. No row added.");
                        console.warn("Original quantity exceeded. New quantity cannot be less than the original.");
                    } else {
                        // Get the binding context for the current row
                        originalValue=quantityDifference
                        let oContext = oInput.getBindingContext("materialData");
                        let currentRowData = oContext.getObject(); // Get the current row data
                        // Duplicate the row data
                        let duplicatedRowData = Object.assign({}, currentRowData);
                        // Set the Quantity of the duplicated row to the calculated difference
                        duplicatedRowData.Quantity = quantityDifference;
                        // Add the duplicated row to the model
                        let oModel = this.getView().getModel("materialData");
                        let aData = oModel.getData(); // Get current data array
                        aData.push(duplicatedRowData); // Add duplicated row to the array
                        oModel.setData(aData); // Set the updated array back to the model

                        sap.m.MessageToast.show("Row duplicated successfully with Quantity difference.");
                    }
                } else {
                    console.log("Invalid quantity values");
                }
            },
        });
    });
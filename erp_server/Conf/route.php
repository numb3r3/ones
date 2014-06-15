<?php
/**
    rest 路由
 *  */

/**
 * 自动生成URL路由
 * array("home/dataModel/:id\d", "HOME/DataModel/read", "", "get", "json"),
    array("home/dataModel/:id\d", "HOME/DataModel/update", "", "put", "json"),
    array("home/dataModel", "HOME/DataModel/index", "", "get", "json"),
    array("home/dataModel", "HOME/DataModel/insert", "", "post", "json"),
    array("home/dataModel/:id", "HOME/DataModel/delete", "", "delete", "json"),
 */
function routeMaker($resName, $mapUrl, $methods = array()) {
    if(!$methods) {
        $methods = array("list", "get", "put", "post", "delete");
    }
    
    $return = array();
    
    if(in_array("get", $methods)) {
        array_push($return, array(
            $resName."/:id", $mapUrl."/read", "", "get", "json"
        ));
    }
    if(in_array("list", $methods)) {
        array_push($return, array(
            $resName, $mapUrl."/index", "", "get", "json"
        ));
    }
    if(in_array("put", $methods)) {
        array_push($return, array(
            $resName."/:id", $mapUrl."/update", "", "put", "json"
        ));
    }
    if(in_array("post", $methods)) {
        array_push($return, array(
            $resName, $mapUrl."/insert", "", "post", "json"
        ));
    }
    if(in_array("delete", $methods)) {
        array_push($return, array(
            $resName."/:id", $mapUrl."/delete", "", "delete", "json"
        ));
    }
    
    return $return;
    
}

$base = array(
    //array("passport/userLogin", "HOME/Passport/userLogin", "", "get", "json"),
    array("JXC/StockProductList/Export", "HOME/JXC/StockProductList/Export", "", "get", "json"),
);

$urlRoutes = array_merge($base, 
    routeMaker("passport/userLogin", "Passport/Login", array("post")),
    routeMaker("passport/userLogout", "Passport/Login", array("list")),
    
    routeMaker("user", "Passport/User"),
    routeMaker("passport/authRule", "Passport/AuthRule"),
    routeMaker("passport/authGroup", "Passport/AuthGroup"),
    routeMaker("passport/authGroupRule", "Passport/AuthGroupRule"),
    routeMaker("passport/department", "Passport/Department"),
        
    routeMaker("types", "HOME/Types"),
    routeMaker("config", "HOME/Config"),
    routeMaker("home/myDesktop", "HOME/MyDesktop"),
    routeMaker("home/dataModel", "HOME/DataModel"),
    routeMaker("home/userDesktop", "HOME/UserDesktop"),
    routeMaker("home/dataModelFields", "HOME/DataModelFields"),
    routeMaker("home/dataModelData", "HOME/DataModelData"),
    
    routeMaker("workflow/nodes", "HOME/WorkflowNode"),
    routeMaker("workflow/process", "HOME/WorkflowProcess", array("get")),
    routeMaker("workflow", "HOME/Workflow"),
        
    routeMaker("crm/relCompanyGroup", "CRM/RelationshipCompanyGroup"),
    routeMaker("crm/relCompany", "CRM/RelationshipCompany"),
    
    routeMaker("jxc/stock", "JXC/Stock"),
    routeMaker("jxc/goods", "JXC/Goods"),
    routeMaker("jxc/orders", "JXC/Orders"),
    routeMaker("jxc/productTpl", "JXC/ProductTpl"),
    routeMaker("jxc/productTplDetail", "JXC/ProductTplDetail"),
    routeMaker("jxc/outside", "JXC/Outside"),
    routeMaker("jxc/goodsCategory", "JXC/GoodsCategory"),
    routeMaker("jxc/StockWarning", "JXC/StockWarning", array("list")),
    routeMaker("jxc/stockProductList", "JXC/StockProductList", array("list", "get", "put")),
    routeMaker("jxc/stockin", "JXC/Stockin", null),
    routeMaker("jxc/stockout", "JXC/Stockout", null),
    routeMaker("jxc/shipment", "JXC/Shipment", null),
    routeMaker("jxc/stockTransfer", "JXC/StockTransfer", null),
    routeMaker("jxc/purchase", "JXC/Purchase"),
    routeMaker("jxc/returns", "JXC/Returns"),
        
    routeMaker("produce/craft", "Produce/Craft"),
    routeMaker("produce/produceBoms", "Produce/ProduceBoms"),
    routeMaker("produce/goodsCraft", "Produce/GoodsCraft", array("list", "put")),
    routeMaker("produce/producePlan", "Produce/ProducePlan"),
    routeMaker("produce/producePlanDetail", "Produce/ProducePlanDetail"),
    routeMaker("produce/doCraft", "Produce/DoCraft"),
        
    routeMaker("finance/financeAccount", "Finance/FinanceAccount"),
    routeMaker("finance/financeReceivePlan", "Finance/FinanceReceivePlan"),
    routeMaker("finance/financePayPlan", "Finance/FinancePayPlan"),
    routeMaker("finance/financeRecord", "Finance/FinanceRecord")
        
//    routeMaker("jxc")
);

//print_r($urlRoutes);

return $urlRoutes;
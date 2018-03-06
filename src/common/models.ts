/**
 * Created by ouShiming on 2018/3/6.
 */

export class ParkingPlacesModel {
  constructor(/**
               * 停车场ID
               */
              public  parkingPlacesId?: string,
              /**
               * 停车场编号
               */
              public  parkingPlacesName?: string,
              /**
               * 车位总数
               */
              public  parkingTotal?: number,
              /**
               * 剩余车位数
               */
              public  parkingRemaining?: number,
              /**
               * 停车类型
               */
              public  parkingType?: string,
              /**
               * 访客是否可见  （0：不可见  1：可见）
               */
              public  visitorsVisible?: number,
              /**
               * 员工是否可见  （0：不可见  1：可见）
               */
              public  employeeVisible?: number,
              /**
               * 停车场位置
               */
              public  parkingPlacesAddress?: string,
              /**
               * 停车属性
               */
              public  parkingProperty?: string,
              /**
               * 导航图
               */
              public   navigationMap?: string,
              /**
               * 停车场说明
               */
              public  remark?: string,
              /**
               * 状态
               */
              public  status?: number,
              /**
               * 创建人
               */
              public  createBy?: string,
              /**
               * 创建时间
               */
              public  createTime?: string,
              /**
               * 修改人
               */
              public  modifyBy?: string,
              /**
               * 修改时间
               */
              public  modifyTime?: string
  ) {
  }
}

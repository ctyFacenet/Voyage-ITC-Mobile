import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Dimensions} from 'react-native';
import  Icon  from 'react-native-vector-icons/AntDesign';
import  IconAwe6  from 'react-native-vector-icons/FontAwesome6';
import  IconFea  from 'react-native-vector-icons/Feather';

import { COLORS, FONTSIZE, SPACING } from '../../../theme/theme';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { getApprovalDetail, putApprovalReport } from '../../services/ApprovalServices/ApprovalServices';
import PDFView from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import PDFExample from '../../components/Pdf';
import ModalConfirmPass from '../../components/ModalConfirmPass';
import ModalApproval from '../../components/ModalApproval';


const ApprovalDetailScreen = ({route} : any) => {
    const navigation = useNavigation()
    console.log(route.params);


    

    // const [dataPdf, setDataPdf] = React.useState<any>(null)
   
    const {entityId, entityType} = route.params.dataAproval;
    const [isVisibaleModalPass, setIsVisibaleModalPass] = React.useState(false)
    const [isVisibaleModalApproval, setIsVisibaleModalApproval] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [pass, setPass] = React.useState('')

    const [accepted, setAccepted] = React.useState(false)

    const handleRefuse = () => {
      setAccepted(false)
      setIsVisibaleModalApproval(true)
    }

    const handleQuota = () => {
      setIsVisibaleModalApproval(true)
        
    }

    const handleApproval = () => {

      setAccepted(true)
      
      setIsVisibaleModalApproval(true)
        
    }

    const getReportType = (entityType : any) : string => {
      switch (entityType) {
    
        case 31:
          return 'payments';
        case 32:
          return 'payments';
    
        default:
          return 'payments';
      }
    }

    const onHandleConfirmApprove = async () => {
      
      let data = {
        note: content,
        accepted: accepted,
        password: pass
      }

      
      let response = await putApprovalReport(getReportType(entityType),entityId, data);

      console.log(response);
      
      
    }


    React.useEffect(() => {
      const fetchDataAndSavePdf = async () => {
        try {
          // Gọi API để lấy dữ liệu
          const response = await getApprovalDetail(entityId, entityType);
          // console.log(response);
          
          
        //   // Chuyển đổi blob thành base64
        //   const base64Data = await convertBlobToBase64(response);
    
        //   // Tạo URI cho PDF từ dữ liệu base64
        //   const pdfUri = `data:application/pdf;base64,${base64Data}`;
        //   console.log(pdfUri);
          
          
        //   // Lưu PDF xuống thiết bị
        //   const pdfFilePath = await savePdfToDevice(pdfUri);
          
        //   console.log(pdfFilePath.path());
        } catch (error) {
          console.error('Error fetching data or saving PDF:', error);
        }
      };
    
      // Gọi hàm fetchDataAndSavePdf khi useEffect được gọi
      fetchDataAndSavePdf();
    }, []);
    
    // Hàm chuyển đổi từ blob sang base64
    const convertBlobToBase64 = async (blobUri: any) => {
      try {
        const base64Data = await RNFetchBlob.fs.readFile(blobUri, 'base64');
        return base64Data;
      } catch (error) {
        throw new Error('Error converting blob to base64:');
      }
    };
    
    // Hàm lưu PDF xuống thiết bị
    const savePdfToDevice = async (pdfUri: any) => {
      try {
        const pdfFilePath = await RNFetchBlob.config({
          fileCache: true,
          appendExt: 'pdf'
        }).fetch('GET', pdfUri);
    
        return pdfFilePath;
      } catch (error) {
        throw new Error('Error saving PDF:');
      }
    };
    
    
    
  return (
    <View style={styles.container}>
        <View style={styles.headerApproval}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrowleft' color={COLORS.primary} size={20} />

            </TouchableOpacity>
            <Text style={styles.title}>Đề nghị thanh toán</Text>
            <Text></Text>
        </View>

        <View style={styles.footerApproval}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{alignItems: 'center'}}>
                <Icon name='leftcircleo' color={COLORS.primary} size={20} />
                <Text>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRefuse} style={{alignItems: 'center'}}>
                <IconAwe6 name='file-excel' color={COLORS.red} size={20} />
                <Text style={{color: COLORS.red}}>Từ chối</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={handleQuota} style={{alignItems: 'center'}}>
                <IconFea name='users' color={COLORS.primary} size={20} />
                <Text  style={{color: COLORS.primary}}>Chọn ký nháy</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={handleApproval} style={{alignItems: 'center'}}>
                <IconAwe6 name='file-circle-check' color={COLORS.green} size={20} />
                <Text style={{color: COLORS.green}}>Phê duyệt</Text>

            </TouchableOpacity>
        </View>
        <PDFView
          trustAllCerts={false}
          style={{ height: '80%' }}
          source={{uri:`https://dev.apiitc.facenet.vn/assets/c30d3ed7-1ad2-4e5c-aee8-9013c2e9d846.pdf`,  cache: true }}
          onLoadComplete={(numberOfPages,filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page,numberOfPages) => {
              console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
              console.log(error);
          }}
          onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
          }}
        />

        <ModalConfirmPass isVisibaleModalPass={isVisibaleModalPass} setIsVisibaleModalPass={setIsVisibaleModalPass} pass={pass} setPass={setPass} onHandleConfirmApprove={onHandleConfirmApprove} />

        <ModalApproval isVisibaleModalApproval={isVisibaleModalApproval} setIsVisibaleModalApproval={setIsVisibaleModalApproval} setIsVisibaleModalPass={setIsVisibaleModalPass} title={'đề nghị thanh toán'} accepted={accepted} content={content} setContent={setContent} />


    
        
    </View>
  );
};

export default ApprovalDetailScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  headerApproval: {
    height: scale(60),
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    elevation: 5,
    backgroundColor: COLORS.White
  },
  footerApproval: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(100),
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    elevation: 5,
    backgroundColor: COLORS.White
  },
  title: {color: COLORS.primary, fontWeight: '700', fontSize: FONTSIZE.size_18 },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}
});

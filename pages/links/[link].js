import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';

export async function getServerSideProps({params}){
  const { link } = params
  const response = await axiosClient.get(`/api/linksCreator/${link}`);

  return {
    props: {
      link: response.data
    }
  }
}

export async function getServerSidePaths(){
  const linksResponse = await axiosClient.get('/api/linksCreator');
  return {
    paths: linksResponse.data.linksList.map(link => ({
      params: {link : link.fileUrl}
    })),
    fallback: false
  }
}

export default ({link}) => {
  const file = link.msg
  return (
    <Layout>
      <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
      <div className="flex items-center justify-center mt-10">
        <a href={`${process.env.backendURL}/api/files/${file}`} className="bg-red-500 px-10 py-3 text-white uppercase rounded font-bold cursor-pointer text-center" download>Descargar</a>
      </div>
    </Layout>
  )
}
interface IS3Service {
  uploadFile(filePath: string): Promise<string>;
  deleteFile(fileName: string): Promise<void>;
}

export default IS3Service;

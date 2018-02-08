package com.NadiaRS.InferenceEngine.ruleParser;

import com.NadiaRS.InferenceEngine.nodePackage.MetaType;
import com.NadiaRS.InferenceEngine.nodePackage.NodeSet;

public interface IScanFeeder {
	public void handleParent(String parentText, int lineNumber);
	public void handleChild(String parentText, String childText, String firstKeywordsGroup, int lineNumber);
//	public void handleNeedWant(String parentText, String childText, int lineNumber);
	public void handleListItem(String parentText, String itemText, MetaType metaTyp);
//	public void handleIterateCheck(String iterateParent, String parentText, String checkText, int lineNumber);
	public String handleWarning(String parentText);
	public NodeSet getNodeSet();
	public void setNodeSet(NodeSet ns);
	public int[][] createDependencyMatrix();

}
